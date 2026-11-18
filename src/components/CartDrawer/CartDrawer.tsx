import * as Dialog from '@radix-ui/react-dialog';
import { useTranslation } from 'react-i18next';
import { useCatalog } from '../../context/CatalogContext';
import { formatPrice } from '../../lib/utils';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  portalContainer?: HTMLElement | null;
}

export function CartDrawer({ portalContainer }: CartDrawerProps) {
  const { t } = useTranslation();
  const {
    isCartOpen,
    closeCart,
    cartEntries,
    incrementItem,
    decrementItem,
    removeItem,
    currency,
  } = useCatalog();

  return (
    <Dialog.Root
      open={isCartOpen}
      onOpenChange={(open) => {
        if (!open) closeCart();
      }}
    >
      <Dialog.Portal container={portalContainer}>
        <Dialog.Overlay className={styles.overlay} data-node-id="212:111547" />
        <Dialog.Content
          className={styles.content}
          data-node-id="212:111781"
          data-name="Shopping Cart"
          aria-describedby={undefined}
        >
          <button
            type="button"
            className={styles.closeButton}
            onClick={closeCart}
            aria-label={t('close')}
            data-node-id="212:111818"
          >
            <img
              src="/assets/figma/x-close.svg"
              alt=""
              aria-hidden="true"
              className={styles.closeIcon}
            />
          </button>

          <Dialog.Title className={styles.heading} data-node-id="212:111790">
            {t('yourCart')}
          </Dialog.Title>

          {cartEntries.length === 0 ? (
            <p className={styles.emptyMessage}>{t('emptyCart')}</p>
          ) : (
            <div className={styles.itemList} data-node-id="212:111870">
              {cartEntries.map(({ item, quantity }) => (
                <div
                  key={item.id}
                  className={styles.itemCard}
                  data-node-id="212:111835"
                  data-name="Product Card"
                >
                  <div className={styles.thumbContainer}>
                    <div className={styles.thumbAspect}>
                      <img
                        src={item.detailImage ?? item.image}
                        alt={item.name}
                        className={styles.thumbImg}
                      />
                    </div>
                  </div>

                  <div className={styles.itemBody} data-node-id="212:111853">
                    <div className={styles.itemText} data-node-id="212:111839">
                      <p className={styles.itemTitle} data-node-id="212:111840">
                        {item.name}
                      </p>
                      <p className={styles.itemPrice} data-node-id="212:111841">
                        {formatPrice(item.priceMxn, currency)}
                      </p>
                    </div>

                    <div
                      className={styles.itemActions}
                      data-node-id="262:101085"
                    >
                      <button
                        type="button"
                        className={styles.removeBtn}
                        onClick={() => removeItem(item.id)}
                        aria-label={`${t('removeItem')} ${item.name}`}
                        data-node-id="262:101081"
                      >
                        <span data-node-id="262:101083">{t('removeItem')}</span>
                      </button>

                      <div
                        className={styles.stepperPill}
                        role="group"
                        aria-label={`Cantidad de ${item.name}`}
                        data-node-id="265:101086"
                      >
                        <button
                          type="button"
                          className={styles.stepperBtn}
                          onClick={() => decrementItem(item.id)}
                          aria-label={`Disminuir o eliminar ${item.name}`}
                        >
                          <img
                            src={
                              quantity > 1
                                ? '/assets/figma/minus.svg'
                                : '/assets/figma/trash.svg'
                            }
                            alt=""
                            aria-hidden="true"
                            className={styles.stepperIcon}
                          />
                        </button>
                        <span className={styles.stepperQty}>{quantity}</span>
                        <button
                          type="button"
                          className={styles.stepperBtn}
                          onClick={() => incrementItem(item)}
                          aria-label={`Aumentar cantidad de ${item.name}`}
                        >
                          <img
                            src="/assets/figma/plus.svg"
                            alt=""
                            aria-hidden="true"
                            className={styles.stepperIcon}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
