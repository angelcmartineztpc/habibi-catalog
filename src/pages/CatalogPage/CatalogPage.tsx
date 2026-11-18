import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCatalog } from '../../context/CatalogContext';
import { Menu } from '../../components/Menu/Menu';
import { WorldMapView } from '../../components/WorldMapView/WorldMapView';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import { BottomBar } from '../../components/BottomBar/BottomBar';
import { ProductDetailDrawer } from '../../components/ProductDetailDrawer/ProductDetailDrawer';
import { CartDrawer } from '../../components/CartDrawer/CartDrawer';
import styles from './CatalogPage.module.css';

export default function CatalogPage() {
  const { t } = useTranslation();
  const { viewMode, filteredItems, selectedOrigin, collectionFilter } =
    useCatalog();
  const [stageElement, setStageElement] = useState<HTMLElement | null>(null);

  const isMap = viewMode === 'map';

  return (
    <main
      ref={setStageElement}
      className={styles.stage}
      data-node-id="195:103052"
      data-name="iPad Pro 11' - 1 / Home Grid"
    >
      {!isMap && (
        <div className={styles.blurredBackground} aria-hidden="true">
          <img
            src="/assets/figma/hero-cellar.png"
            alt=""
            className={styles.bgImage}
          />
          <div className={styles.bgDarkOverlay} />
          <div className={styles.bgBlurLayer} />
        </div>
      )}

      <Menu
        showCategories={true}
        variant={isMap ? 'solid' : 'transparent'}
      />

      {isMap ? (
        <WorldMapView />
      ) : (
        <section
          className={styles.gridViewport}
          aria-label="Catálogo de productos"
          data-node-id="212:111112"
        >
          {filteredItems.length === 0 ? (
            <div
              className={styles.emptyStateContainer}
              data-node-id="175:96846"
              data-name="Sin resultados"
            >
              <h2 className={styles.emptyStateTitle} data-node-id="175:96847">
                {t('noResultsTitle')}
              </h2>
              <p className={styles.emptyStateSubtitle} data-node-id="175:96961">
                {t('noResultsSubtitle')}
              </p>
            </div>
          ) : selectedOrigin || collectionFilter === 'seleccionados' ? (
            <div
              className={styles.originHeaderBlock}
              data-node-id={
                selectedOrigin ? '175:96349' : '146:62884'
              }
              data-name={selectedOrigin ? 'Lugar de origen' : 'Seleccionados'}
            >
              <h2
                className={styles.originHeading}
                data-node-id={selectedOrigin ? '175:96350' : '146:62885'}
              >
                {selectedOrigin ?? t('selectedWines')}
              </h2>
              <div
                className={
                  selectedOrigin
                    ? styles.productGridThree
                    : styles.productGridFive
                }
                data-node-id={selectedOrigin ? '175:96351' : '146:62681'}
              >
                {filteredItems.map((item) => (
                  <ProductCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.productGridFive}>
              {filteredItems.map((item) => (
                <ProductCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </section>
      )}

      <BottomBar />

      <ProductDetailDrawer portalContainer={stageElement} />
      <CartDrawer portalContainer={stageElement} />
    </main>
  );
}
