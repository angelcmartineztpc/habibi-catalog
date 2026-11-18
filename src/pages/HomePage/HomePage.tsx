import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, type CategoryId } from '../../data/catalog';
import { useCatalog } from '../../context/CatalogContext';
import { Menu } from '../../components/Menu/Menu';
import { cn } from '../../lib/utils';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { activeCategory, setActiveCategory, setViewMode } = useCatalog();

  const handleSelectCategory = (categoryId: CategoryId) => {
    setActiveCategory(categoryId);
    setViewMode('grid');
    navigate('/');
  };

  return (
    <main
      className={styles.stage}
      data-node-id="6:114"
      data-name="iPad Pro 11' - 1 / Home"
    >
      <div className={styles.heroBackground} data-node-id="146:62605">
        <img
          src="/assets/figma/hero-cellar.png"
          alt="Habibi Wine Cellar"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
      </div>

      <Menu showCategories={false} variant="transparent" />

      <section
        className={styles.categoriesRow}
        aria-label="Categorías principales"
        data-node-id="9:53"
      >
        {CATEGORIES.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => handleSelectCategory(cat.id)}
              className={cn(
                styles.sectionCard,
                isActive && styles.sectionCardActive,
              )}
              data-name="Section Card"
            >
              <img
                src={cat.icon}
                alt=""
                aria-hidden="true"
                className={styles.categoryIcon}
              />
              <div className={styles.cardText}>
                <p className={styles.categoryTitle}>
                  {t(`categories.${cat.id}`)}
                </p>
                <p className={styles.categoryCount}>
                  {t('resultsCount', { count: cat.totalResults })}
                </p>
              </div>
            </button>
          );
        })}
      </section>
    </main>
  );
}
