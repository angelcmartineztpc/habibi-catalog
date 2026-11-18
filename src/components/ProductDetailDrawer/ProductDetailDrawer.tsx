import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTranslation } from 'react-i18next';
import { useCatalog } from '../../context/CatalogContext';
import { formatPrice } from '../../lib/utils';
import styles from './ProductDetailDrawer.module.css';

interface ProductDetailDrawerProps {
  portalContainer?: HTMLElement | null;
}

export function ProductDetailDrawer({
  portalContainer,
}: ProductDetailDrawerProps) {
  const { t, i18n } = useTranslation();
  const {
    selectedProduct,
    closeProductDetail,
    incrementItem,
    currency,
  } = useCatalog();
  const [draftQty, setDraftQty] = useState<number>(1);
  const [lastProductId, setLastProductId] = useState<string | null>(null);

  const isEn = i18n.language.startsWith('en');

  if (!selectedProduct) return null;

  if (lastProductId !== selectedProduct.id) {
    setLastProductId(selectedProduct.id);
    setDraftQty(1);
  }

  const handleAdd = () => {
    incrementItem(selectedProduct, draftQty);
    closeProductDetail();
  };

  return (
    <Dialog.Root
      open={Boolean(selectedProduct)}
      onOpenChange={(open) => {
        if (!open) closeProductDetail();
      }}
    >
      <Dialog.Portal container={portalContainer}>
        <Dialog.Overlay className={styles.overlay} data-node-id="26:860" />
          <Dialog.Content
          className={styles.content}
          data-node-id="175:97025"
          data-name="Product Detail Drawer"
          aria-describedby="product-detail-description"
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeProductDetail}
            aria-label={t('close')}
            data-node-id="175:97054"
          >
            <img
              src="/assets/figma/x-close.svg"
              alt=""
              aria-hidden="true"
              className={styles.closeIcon}
            />
          </button>

          <div className={styles.drawerInner} data-node-id="202:110879">
            <div className={styles.topRow} data-node-id="202:110878">
              {/* Left Column Details (175:97029) */}
              <div className={styles.descriptionColumn} data-node-id="175:97029">
                <div className={styles.infoStack} data-node-id="175:97030">
                  <div className={styles.titleGroup} data-node-id="175:97031">
                    <div className={styles.nameBlock} data-node-id="175:97034">
                      <Dialog.Title
                        className={styles.productTitle}
                        data-node-id="175:97035"
                      >
                        {selectedProduct.name}
                      </Dialog.Title>
                      <p className={styles.productSubtitle} data-node-id="175:97037">
                        {selectedProduct.subtitle}
                      </p>
                    </div>
                  </div>

                  <p
                    id="product-detail-description"
                    className={styles.descriptionText}
                    data-node-id="175:97043"
                  >
                    {isEn
                      ? selectedProduct.descriptionEn
                      : selectedProduct.descriptionEs}
                  </p>

                  <div
                    className={styles.dividerLine}
                    role="separator"
                    data-node-id="175:97044"
                  />

                  <div className={styles.metaStack} data-node-id="175:97045">
                    <div className={styles.metaItem} data-node-id="175:97046">
                      <span className={styles.metaLabel} data-node-id="175:97047">
                        {t('producer')}
                      </span>
                      <span className={styles.metaValue} data-node-id="175:97048">
                        {selectedProduct.producer}
                      </span>
                    </div>

                    <div className={styles.metaItem} data-node-id="175:97049">
                      <span className={styles.metaLabel} data-node-id="175:97050">
                        {t('grapes')}
                      </span>
                      <span className={styles.metaValue} data-node-id="175:97051">
                        {isEn ? selectedProduct.grapesEn : selectedProduct.grapesEs}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column Bottle Render inside Drawer (175:97026) */}
              <div className={styles.bottleColumn} data-node-id="175:97026">
                <div className={styles.bottleViewport} data-node-id="175:97027">
                  <div className={styles.bottleAspect} data-node-id="175:97028">
                    <img
                      src={selectedProduct.detailImage ?? selectedProduct.image}
                      alt={selectedProduct.name}
                      className={styles.bottleImage}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Price + Stepper + CTA (202:110877) */}
            <div className={styles.bottomActions} data-node-id="202:110877">
              <div className={styles.priceRow} data-node-id="175:97186">
                <div className={styles.priceTextGroup} data-node-id="175:97201">
                  <span className={styles.priceValue} data-node-id="175:97187">
                    {formatPrice(selectedProduct.priceMxn, currency)}
                  </span>
                  <span className={styles.taxNote} data-node-id="175:97188">
                    {t('taxIncluded')}
                  </span>
                </div>

                <div
                  className={styles.detailQtyGroup}
                  role="group"
                  aria-label={`Cantidad de ${selectedProduct.name}`}
                  data-node-id="175:97200"
                >
                  <button
                    type="button"
                    className={styles.detailQtyBtn}
                    onClick={() => setDraftQty((q) => Math.max(1, q - 1))}
                    aria-label="Disminuir cantidad"
                    data-node-id="175:97195"
                  >
                    <img
                      src="/assets/figma/minus.svg"
                      alt=""
                      aria-hidden="true"
                      className={styles.detailQtyIcon}
                    />
                  </button>
                  <span className={styles.detailQtyValue} data-node-id="175:97194">
                    {draftQty}
                  </span>
                  <button
                    type="button"
                    className={styles.detailQtyBtn}
                    onClick={() => setDraftQty((q) => q + 1)}
                    aria-label="Aumentar cantidad"
                    data-node-id="175:97190"
                  >
                    <img
                      src="/assets/figma/plus.svg"
                      alt=""
                      aria-hidden="true"
                      className={styles.detailQtyIcon}
                    />
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={styles.addToCartBtn}
                onClick={handleAdd}
                data-node-id="175:97183"
              >
                <span data-node-id="175:97184">{t('addToCart')}</span>
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
