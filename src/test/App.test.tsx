import fs from 'node:fs';
import path from 'node:path';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import App, { AppRoutes } from '../App';
import { CatalogProvider } from '../context/CatalogContext';
import { CATALOG_ITEMS, CATEGORIES, MAP_COUNTRY_PINS } from '../data/catalog';

describe('Habibi Digital Catalog (Figma Main Flow & Approved Map 238:87313)', () => {
  it('verifies all local Figma static assets and country glowing silhouettes exist and are non-empty on disk', () => {
    const publicDir = path.resolve(process.cwd(), 'public');

    const assetPaths = new Set<string>([
      '/assets/figma/logo.png',
      '/assets/figma/hero-cellar.png',
      '/assets/figma/world-map.png',
      '/assets/figma/world-map-clean.png',
      '/assets/figma/chevron-down.svg',
      '/assets/figma/search.svg',
      '/assets/figma/layout-grid.svg',
      '/assets/figma/layout-grid-active.svg',
      '/assets/figma/map.svg',
      '/assets/figma/map-active.svg',
      '/assets/figma/shopping-cart.svg',
      '/assets/figma/plus-dark.svg',
      '/assets/figma/minus-dark.svg',
      '/assets/figma/x-close.svg',
      '/assets/figma/plus.svg',
      '/assets/figma/minus.svg',
      '/assets/figma/trash.svg',
      '/assets/figma/divider.svg',
      '/assets/figma/radial-selected.svg',
      '/assets/figma/flag-mexico.svg',
      '/assets/figma/flag-usa.svg',
      '/assets/figma/flag-spain.svg',
      '/assets/figma/flag-france.svg',
    ]);

    for (const cat of CATEGORIES) {
      assetPaths.add(cat.icon);
    }
    for (const item of CATALOG_ITEMS) {
      assetPaths.add(item.image);
      if (item.detailImage) assetPaths.add(item.detailImage);
    }
    for (const pin of MAP_COUNTRY_PINS) {
      assetPaths.add(pin.silhouetteImage);
      if (pin.flagSvg) assetPaths.add(pin.flagSvg);
    }

    for (const relPath of assetPaths) {
      const fullPath = path.join(publicDir, relPath);
      expect(fs.existsSync(fullPath), `Missing asset: ${relPath}`).toBe(true);
      const stat = fs.statSync(fullPath);
      expect(stat.size, `Empty asset: ${relPath}`).toBeGreaterThan(0);
    }
  });

  it('renders the approved Map view (238:87313) with glowing country silhouette, Sleek Right Liquid Glass Panel, and dynamic country switching', async () => {
    const user = userEvent.setup();
    render(
      <CatalogProvider initialViewMode="map">
        <MemoryRouter initialEntries={['/catalogo']}>
          <AppRoutes />
        </MemoryRouter>
      </CatalogProvider>,
    );

    expect(await screen.findByAltText('HABIBI')).toBeInTheDocument();

    // France starts illuminated on the map with its Liquid Glass right panel
    expect(screen.getByTestId('glowing-country-Francia')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Viñedos de Francia/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/FRANCIA · 96\+ PTS SOMMELIER/i)).toBeInTheDocument();

    // Add a wine directly from the right Liquid Glass panel and verify Selected Gold state
    await user.click(
      screen.getByRole('button', { name: /Agregar Chardonnay al carrito/i }),
    );
    expect(screen.getByText(/SELECCIONADO · 1/i)).toBeInTheDocument();
    expect(screen.getByText('$620.00')).toBeInTheDocument();

    // Click Mexico pin on the map -> Mexico silhouette illuminates and panel updates to Viñedos de México
    await user.click(screen.getByRole('button', { name: /Seleccionar México/i }));
    expect(screen.getByTestId('glowing-country-México')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Viñedos de México/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Reserva Malbec')).toBeInTheDocument();

    // Click "Ver cuadrícula de México" CTA in the panel to transition to filtered Grid (175:96343)
    await user.click(
      screen.getByRole('button', { name: /Ver cuadrícula de México/i }),
    );
    expect(
      await screen.findByRole('heading', { name: 'México' }),
    ).toBeInTheDocument();
  });

  it('switches from Map view to Grid view (21:89), opens Product Detail Drawer (26:540), adds to Cart, and opens Cart Drawer (212:111524)', async () => {
    const user = userEvent.setup();
    render(
      <CatalogProvider initialViewMode="grid">
        <MemoryRouter initialEntries={['/catalogo']}>
          <AppRoutes />
        </MemoryRouter>
      </CatalogProvider>,
    );

    expect(await screen.findByText('Reserva Malbec')).toBeInTheDocument();
    expect(screen.getByText('Cabernet Reserva')).toBeInTheDocument();
    expect(screen.getByText('Pinot Noir')).toBeInTheDocument();

    // Open product detail drawer for Brut de la Casa (which showcases Champagne Krug detail 26:540)
    await user.click(
      screen.getByRole('button', { name: /Ver detalles de Brut de la Casa/i }),
    );

    expect(
      await screen.findByRole('heading', { name: /Champagne Krug/i }),
    ).toBeInTheDocument();
    expect(screen.getByText('Maison Krug')).toBeInTheDocument();
    expect(
      screen.getByText('Pinot Noir, Chardonnay y Meunier'),
    ).toBeInTheDocument();

    // Click "Agregar al carrito"
    await user.click(
      screen.getByRole('button', { name: /Agregar al carrito/i }),
    );

    // Bottom bar cart pill updates to "Ver carrito · 1"
    await waitFor(() => {
      expect(screen.getByText(/Ver carrito · 1/i)).toBeInTheDocument();
    });

    // Open Cart Drawer (212:111524) and verify Quitar button (262:101083)
    await user.click(screen.getByText(/Ver carrito · 1/i));
    expect(
      await screen.findByRole('heading', { name: /Tu carrito/i }),
    ).toBeInTheDocument();
    const removeBtn = screen.getByRole('button', {
      name: /Quitar Champagne Krug/i,
    });
    expect(removeBtn).toBeInTheDocument();
    await user.click(removeBtn);
    expect(
      await screen.findByText(/Tu carrito está vacío/i),
    ).toBeInTheDocument();
  });

  it('filters by search query and displays the Empty State (175:96840) when no wines match', async () => {
    const user = userEvent.setup();
    render(
      <CatalogProvider initialViewMode="grid">
        <MemoryRouter initialEntries={['/catalogo']}>
          <AppRoutes />
        </MemoryRouter>
      </CatalogProvider>,
    );

    const searchInput = await screen.findByPlaceholderText(/Buscar un vino.../i);
    await user.type(searchInput, 'inexistentexyz');

    expect(
      await screen.findByRole('heading', {
        name: /No se han encontrado resultados/i,
      }),
    ).toBeInTheDocument();
  });

  it('renders the Home Hero page (6:114) as the initial landing screen at / with all 5 category cards and switches language ENG/ES', async () => {
    const user = userEvent.setup();
    render(<App />);

    expect(await screen.findByAltText('Habibi Wine Cellar')).toBeInTheDocument();
    expect(screen.getAllByText(/20 resultados/i)).toHaveLength(5);

    // Switch language to ENG
    await user.click(screen.getByRole('button', { name: 'ENG' }));
    expect(await screen.findAllByText(/20 results/i)).toHaveLength(5);

    // Switch back to ES
    await user.click(screen.getByRole('button', { name: 'ES' }));
    expect(await screen.findAllByText(/20 resultados/i)).toHaveLength(5);
  });
});
