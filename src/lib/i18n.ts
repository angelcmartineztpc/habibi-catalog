import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

export const resources = {
  es: {
    translation: {
      categories: {
        vinos: 'Vinos',
        cervezas: 'Cervezas',
        sakes: 'Sakes',
        licores: 'Licores',
        cortes: 'Cortes',
      },
      resultsCount: '{{count}} resultados',
      searchPlaceholder: 'Buscar un vino...',
      allWines: 'Todos los vinos',
      allOrigins: 'Todos los vinos',
      selectedWines: 'Seleccionados',
      searchShort: 'Buscar',
      removeItem: 'Quitar',
      viewCart: 'Ver carrito',
      totalLabel: 'Total:',
      yourCart: 'Tu carrito',
      emptyCart: 'Tu carrito está vacío. Agrega una botella desde el catálogo.',
      addToCart: 'Agregar al carrito',
      taxIncluded: 'IVA incluido',
      producer: 'Productor',
      grapes: 'Uvas',
      origin: 'País de origen',
      noResultsTitle: 'No se han encontrado resultados',
      noResultsSubtitle:
        'Intenta con otras palabras clave o modifica los términos de búsqueda.',
      mapInstruction: 'País en el mapa',
      clearFilter: 'Ver todos los países',
      enterCatalog: 'Explorar catálogo',
      switchToGrid: 'Vista de cuadrícula',
      switchToMap: 'Vista de mapa',
      zoomIn: 'Acercar mapa',
      zoomOut: 'Alejar mapa',
      close: 'Cerrar',
    },
  },
  en: {
    translation: {
      categories: {
        vinos: 'Wines',
        cervezas: 'Beers',
        sakes: 'Sakes',
        licores: 'Spirits',
        cortes: 'Steaks',
      },
      resultsCount: '{{count}} results',
      searchPlaceholder: 'Search a wine...',
      allWines: 'All wines',
      allOrigins: 'All wines',
      selectedWines: 'Selected',
      searchShort: 'Search',
      removeItem: 'Remove',
      viewCart: 'View cart',
      totalLabel: 'Total:',
      yourCart: 'Your cart',
      emptyCart: 'Your cart is empty. Add a bottle from the catalog.',
      addToCart: 'Add to cart',
      taxIncluded: 'Tax included',
      producer: 'Producer',
      grapes: 'Grapes',
      origin: 'Country of origin',
      noResultsTitle: 'No results found',
      noResultsSubtitle:
        'Try different keywords or modify your search filters.',
      mapInstruction: 'Country on map',
      clearFilter: 'Show all countries',
      enterCatalog: 'Explore catalog',
      switchToGrid: 'Grid view',
      switchToMap: 'Map view',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      close: 'Close',
    },
  },
} as const;

void i18n.use(initReactI18next).init({
  resources,
  lng: 'es',
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
