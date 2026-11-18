import type { CatalogItem } from '../../data/catalog';
import { useCatalog } from '../../context/CatalogContext';
import { cn, formatPrice } from '../../lib/utils';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  item: CatalogItem;
}

export function ProductCard({ item }: ProductCardProps) {
  const {
    currency,
    getItemQuantity,
    incrementItem,
    decrementItem,
    openProductDetail,
  } = useCatalog();

  const quantity = getItemQuantity(item.id);

  return (
    <article
      className={styles.card}
      data-name="Product Card"
      data-product-id={item.id}
    >
      <button
        type="button"
        className={styles.cardBodyButton}
        onClick={() => openProductDetail(item)}
        aria-label={`Ver detalles de ${item.name}`}
      >
        <div className={styles.imageContainer}>
          <div className={styles.bottleFrame}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.bottleImg}
              loading="lazy"
            />
          </div>
        </div>

        <div className={styles.textGroup}>
          <p className={styles.price}>{formatPrice(item.priceMxn, currency)}</p>
          <p className={styles.title}>{item.name}</p>
        </div>
      </button>

      {quantity === 0 ? (
        <button
          type="button"
          className={cn(styles.cartBadge, styles.cartBadgeSingle)}
          onClick={() => incrementItem(item)}
          aria-label={`Agregar ${item.name} al carrito`}
        >
          <img
            src="/assets/figma/plus.svg"
            alt=""
            aria-hidden="true"
            className={styles.stepperIcon}
          />
        </button>
      ) : (
        <div
          className={cn(styles.cartBadge, styles.cartBadgeStepper)}
          role="group"
          aria-label={`Cantidad de ${item.name}`}
        >
          <button
            type="button"
            className={styles.stepperActionBtn}
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
          <span className={styles.stepperCount}>{quantity}</span>
          <button
            type="button"
            className={styles.stepperActionBtn}
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
      )}
    </article>
  );
}
