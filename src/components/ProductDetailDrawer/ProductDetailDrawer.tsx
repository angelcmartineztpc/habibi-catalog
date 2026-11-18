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
          data-node-id="26:922"
          data-name="Product Detail Drawer"
          aria-describedby="product-detail-description"
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeProductDetail}
            aria-label={t('close')}
            data-node-id="26:943"
          >
            <img
              src="/assets/figma/x-close.svg"
              alt=""
              aria-hidden="true"
              className={styles.closeIcon}
            />
          </button>

          {/* Overlapping Bottle Render (26:911) */}
          <div className={styles.bottleOverlapWrapper} data-node-id="26:911">
            <div className={styles.bottleViewport} data-node-id="26:908">
              <div className={styles.bottleAspect} data-node-id="26:909">
                <img
                  src={selectedProduct.detailImage ?? selectedProduct.image}
                  alt={selectedProduct.name}
                  className={styles.bottleImage}
                />
              </div>
            </div>
          </div>

          {/* Right Column Details (26:936) */}
          <div className={styles.descriptionColumn} data-node-id="26:936">
            <div className={styles.infoStack} data-node-id="26:952">
              <div className={styles.titleGroup} data-node-id="26:914">
                <div className={styles.nameBlock} data-node-id="26:913">
                  <Dialog.Title
                    className={styles.productTitle}
                    data-node-id="26:862"
                  >
                    {selectedProduct.name}
                  </Dialog.Title>
                  <p className={styles.productSubtitle} data-node-id="26:871">
                    {selectedProduct.subtitle}
                  </p>
                </div>

                <div className={styles.priceRow} data-node-id="26:955">
                  <div className={styles.priceTextGroup} data-node-id="175:97201">
                    <span className={styles.priceValue} data-node-id="26:915">
                      {formatPrice(selectedProduct.priceMxn, currency)}
                    </span>
                    <span className={styles.taxNote} data-node-id="26:953">
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
              </div>

              <p
                id="product-detail-description"
                className={styles.descriptionText}
                data-node-id="26:939"
              >
                {isEn
                  ? selectedProduct.descriptionEn
                  : selectedProduct.descriptionEs}
              </p>

              <div
                className={styles.dividerLine}
                role="separator"
                data-node-id="26:912"
              />

              <div className={styles.metaStack} data-node-id="26:945">
                <div className={styles.metaItem} data-node-id="26:923">
                  <span className={styles.metaLabel} data-node-id="26:920">
                    {t('producer')}
                  </span>
                  <span className={styles.metaValue} data-node-id="26:918">
                    {selectedProduct.producer}
                  </span>
                </div>

                <div className={styles.metaItem} data-node-id="26:924">
                  <span className={styles.metaLabel} data-node-id="26:925">
                    {t('grapes')}
                  </span>
                  <span className={styles.metaValue} data-node-id="26:926">
                    {isEn ? selectedProduct.grapesEn : selectedProduct.grapesEs}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              className={styles.addToCartBtn}
              onClick={handleAdd}
              data-node-id="26:946"
            >
              <span data-node-id="26:947">{t('addToCart')}</span>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
