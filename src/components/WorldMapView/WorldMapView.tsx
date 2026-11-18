import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CATALOG_ITEMS,
  MAP_COUNTRY_PINS,
  type CountryOrigin,
} from '../../data/catalog';
import { useCatalog } from '../../context/CatalogContext';
import { cn, formatPrice } from '../../lib/utils';
import styles from './WorldMapView.module.css';

type PanelFilterTab = 'all' | 'selected' | 'included';

export function WorldMapView() {
  const { t, i18n } = useTranslation();
  const {
    highlightedMapCountry,
    setHighlightedMapCountry,
    setSelectedOrigin,
    setViewMode,
    mapZoom,
    zoomIn,
    zoomOut,
    currency,
    getItemQuantity,
    incrementItem,
    decrementItem,
    openProductDetail,
  } = useCatalog();

  const [panelTab, setPanelTab] = useState<PanelFilterTab>('all');

  const isEn = i18n.language.startsWith('en');

  const activePin =
    MAP_COUNTRY_PINS.find((p) => p.country === highlightedMapCountry) ??
    MAP_COUNTRY_PINS[0];

  // All catalog items belonging to the currently highlighted map country
  const countryWines = useMemo(() => {
    return CATALOG_ITEMS.filter(
      (item) => item.country === activePin.country,
    );
  }, [activePin.country]);

  const selectedCountryWines = useMemo(
    () => countryWines.filter((item) => getItemQuantity(item.id) > 0),
    [countryWines, getItemQuantity],
  );

  const displayedPanelWines = useMemo(() => {
    if (panelTab === 'selected') {
      return selectedCountryWines.length > 0
        ? selectedCountryWines
        : countryWines;
    }
    if (panelTab === 'included') {
      return countryWines.filter((item) => item.includedInPackage);
    }
    return countryWines;
  }, [panelTab, countryWines, selectedCountryWines]);

  const handlePinClick = (country: CountryOrigin) => {
    setHighlightedMapCountry(country);
    setPanelTab('all');
  };

  const handleExploreCountryGrid = (country: CountryOrigin) => {
    setSelectedOrigin(country);
    setViewMode('grid');
  };

  // Position floating country pill right next to the glowing country silhouette
  const tagStyle =
    activePin.country === 'Francia'
      ? { left: '608px', top: '98px' }
      : {
          left: `${Math.min(activePin.mapX + activePin.mapW + 10, 620)}px`,
          top: `${Math.max(activePin.mapY - 6, 24)}px`,
        };

  const displayCountryName = isEn ? activePin.labelEn : activePin.labelEs;

  return (
    <section
      className={styles.mapSection}
      aria-label="Mapa mundial de orígenes"
      data-node-id="238:87313"
      data-name="World Map"
    >
      <div
        className={styles.mapCanvas}
        style={{ transform: `scale(${mapZoom})` }}
      >
        {/* Clean dark base map where all countries start unselected (#363021) */}
        <img
          src="/assets/figma/world-map-clean.png"
          alt="Mapa mundial de regiones vinícolas"
          className={styles.mapImage}
        />

        {/* Glowing Selected Country Silhouette Overlay (Shines like France in 238:87313) */}
        <div
          key={activePin.country}
          className={styles.countryGlowOverlay}
          style={{
            left: `${activePin.mapX}px`,
            top: `${activePin.mapY}px`,
            width: `${activePin.mapW}px`,
            height: `${activePin.mapH}px`,
          }}
          data-testid={`glowing-country-${activePin.country}`}
        >
          <div className={styles.countryGlowHalo} />
          <img
            src={activePin.silhouetteImage}
            alt=""
            aria-hidden="true"
            className={styles.countrySilhouetteImg}
          />
        </div>

        {/* Interactive Country Pins */}
        {MAP_COUNTRY_PINS.map((pin) => {
          const isSelected = pin.country === highlightedMapCountry;
          const displayLabel = isEn ? pin.labelEn : pin.labelEs;
          return (
            <button
              key={pin.country}
              type="button"
              className={styles.pinHitbox}
              style={{
                left: `${pin.xPercent}%`,
                top: `${pin.yPercent}%`,
              }}
              onClick={() => handlePinClick(pin.country)}
              aria-label={`Seleccionar ${displayLabel}`}
              aria-pressed={isSelected}
            >
              <span
                className={cn(
                  styles.pinDot,
                  isSelected && styles.pinDotActive,
                )}
              />
            </button>
          );
        })}

        {/* Floating Selected Country Label (195:103101 / 238:87362) */}
        <button
          type="button"
          className={styles.countryTag}
          style={tagStyle}
          onClick={() => handleExploreCountryGrid(activePin.country)}
          data-node-id="238:87362"
          data-name="Francia — etiqueta del país seleccionado"
        >
          <span data-node-id="195:103102">{displayCountryName}</span>
        </button>
      </div>

      {/* Sleek Right-Side Liquid Glass Wine Selection Panel (238:94202) */}
      <aside
        className={styles.sleekRightPanel}
        aria-label={`Vinos de ${displayCountryName}`}
        data-node-id="238:94202"
        data-name="Liquid Glass · Single Right Wine Panel"
      >
        <div className={styles.panelHeader}>
          <div className={styles.panelTopBadges}>
            <span className={styles.terroirPill}>
              {activePin.sommelierBadge}
            </span>
            <span className={styles.wineCountPill}>
              {countryWines.length}{' '}
              {isEn ? 'Wines' : 'Vinos'}
            </span>
          </div>

          <div className={styles.panelTitleGroup}>
            <h2 className={styles.panelRegionTitle}>
              {isEn
                ? `Vineyards of ${displayCountryName}`
                : `Viñedos de ${displayCountryName}`}
            </h2>
            <p className={styles.panelRegionSubtitle}>
              {isEn
                ? activePin.regionSubtitleEn
                : activePin.regionSubtitleEs}
            </p>
          </div>

          <div
            className={styles.panelFilterTabs}
            role="tablist"
            aria-label="Filtros de selección de la región"
          >
            <button
              type="button"
              role="tab"
              aria-selected={panelTab === 'all'}
              onClick={() => setPanelTab('all')}
              className={cn(
                styles.filterTabBtn,
                panelTab === 'all' && styles.filterTabBtnActive,
              )}
            >
              {isEn
                ? `All (${countryWines.length})`
                : `Todos (${countryWines.length})`}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={panelTab === 'selected'}
              onClick={() => setPanelTab('selected')}
              className={cn(
                styles.filterTabBtn,
                panelTab === 'selected' && styles.filterTabBtnActive,
              )}
            >
              {isEn
                ? `Selected (${selectedCountryWines.length})`
                : `Seleccionados (${selectedCountryWines.length})`}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={panelTab === 'included'}
              onClick={() => setPanelTab('included')}
              className={cn(
                styles.filterTabBtn,
                panelTab === 'included' && styles.filterTabBtnActive,
              )}
            >
              {isEn ? 'Included' : 'Incluidos'}
            </button>
          </div>
        </div>

        <div className={styles.panelCardList}>
          {displayedPanelWines.slice(0, 3).map((wine) => {
            const qty = getItemQuantity(wine.id);
            const isSelected = qty > 0;
            return (
              <div
                key={wine.id}
                className={cn(
                  styles.panelWineCard,
                  isSelected && styles.panelWineCardSelected,
                )}
              >
                <button
                  type="button"
                  className={styles.panelCardMainBtn}
                  onClick={() => openProductDetail(wine)}
                  aria-label={`Ver detalles de ${wine.name}`}
                >
                  <div className={styles.bottleThumb}>
                    <img
                      src={wine.image}
                      alt={wine.name}
                      className={styles.bottleThumbImg}
                    />
                  </div>
                  <div className={styles.wineCopyCol}>
                    <span
                      className={cn(
                        styles.wineStatusBadge,
                        isSelected && styles.wineStatusBadgeSelected,
                      )}
                    >
                      {isSelected
                        ? `SELECCIONADO · ${qty}`
                        : `GRAND CRU · ${displayCountryName.toUpperCase()}`}
                    </span>
                    <p className={styles.wineCardTitle}>{wine.name}</p>
                    <p className={styles.wineCardSubtitle}>{wine.subtitle}</p>
                    <p className={styles.wineCardPrice}>
                      {formatPrice(wine.priceMxn, currency)}
                    </p>
                  </div>
                </button>

                {isSelected ? (
                  <div
                    className={styles.cardStepperPill}
                    role="group"
                    aria-label={`Cantidad de ${wine.name}`}
                  >
                    <button
                      type="button"
                      className={styles.stepperStepBtn}
                      onClick={() => decrementItem(wine.id)}
                      aria-label={`Disminuir ${wine.name}`}
                    >
                      −
                    </button>
                    <span className={styles.stepperStepQty}>{qty}</span>
                    <button
                      type="button"
                      className={cn(
                        styles.stepperStepBtn,
                        styles.stepperStepBtnPlus,
                      )}
                      onClick={() => incrementItem(wine)}
                      aria-label={`Aumentar ${wine.name}`}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    className={styles.cardPlusBtn}
                    onClick={() => incrementItem(wine)}
                    aria-label={`Agregar ${wine.name} al carrito`}
                  >
                    +
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className={styles.panelFooterCta}
          onClick={() => handleExploreCountryGrid(activePin.country)}
        >
          <span className={styles.footerCtaLabel}>
            {isEn
              ? `View ${displayCountryName} grid (${countryWines.length} wines)`
              : `Ver cuadrícula de ${displayCountryName} (${countryWines.length} vinos)`}
          </span>
          <span className={styles.footerCtaExplore}>
            {isEn ? 'Explore →' : 'Explorar →'}
          </span>
        </button>
      </aside>

      {/* Top-right Close / Switch to Grid button (195:103100) */}
      <button
        type="button"
        className={styles.closeButton}
        onClick={() => setViewMode('grid')}
        aria-label={t('close')}
        data-node-id="195:103100"
        data-name="x"
      >
        <img
          src="/assets/figma/x-close.svg"
          alt=""
          aria-hidden="true"
          className={styles.closeIcon}
        />
      </button>

      {/* Bottom-right Zoom Control (195:103077) */}
      <div
        className={styles.zoomControl}
        role="group"
        aria-label="Controles de zoom del mapa"
        data-node-id="195:103077"
        data-name="Control"
      >
        <button
          type="button"
          className={styles.zoomBtn}
          onClick={zoomIn}
          aria-label={t('zoomIn')}
          data-node-id="195:103080"
        >
          <img
            src="/assets/figma/plus-dark.svg"
            alt=""
            aria-hidden="true"
            className={styles.zoomIcon}
          />
        </button>
        <button
          type="button"
          className={styles.zoomBtn}
          onClick={zoomOut}
          aria-label={t('zoomOut')}
          data-node-id="195:103083"
        >
          <img
            src="/assets/figma/minus-dark.svg"
            alt=""
            aria-hidden="true"
            className={styles.zoomIcon}
          />
        </button>
      </div>
    </section>
  );
}
