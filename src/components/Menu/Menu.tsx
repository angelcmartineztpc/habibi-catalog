import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { CATEGORIES } from '../../data/catalog';
import { useCatalog } from '../../context/CatalogContext';
import { cn, type CurrencyCode } from '../../lib/utils';
import styles from './Menu.module.css';

interface MenuProps {
  showCategories?: boolean;
  variant?: 'solid' | 'transparent';
}

const CURRENCIES: CurrencyCode[] = ['MXN', 'USD', 'EUR'];

export function Menu({
  showCategories = true,
  variant = 'solid',
}: MenuProps) {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { activeCategory, setActiveCategory, currency, setCurrency } =
    useCatalog();

  const currentLang = i18n.language.startsWith('en') ? 'en' : 'es';

  const handleLanguageChange = (lng: 'es' | 'en') => {
    void i18n.changeLanguage(lng);
  };

  const handleLogoClick = () => {
    if (location.pathname === '/' || location.pathname === '/home') {
      navigate('/catalogo');
    } else {
      navigate('/');
    }
  };

  const activeLangClass =
    variant === 'solid'
      ? styles.langOptionActiveMap
      : styles.langOptionActiveCatalog;

  return (
    <header
      className={cn(
        styles.menu,
        variant === 'solid' ? styles.menuSolid : styles.menuTransparent,
      )}
      data-node-id="195:103054"
      data-name="Menu"
    >
      <div className={styles.logoWrapper} data-node-id="195:103055">
        <button
          type="button"
          className={styles.logoButton}
          onClick={handleLogoClick}
          aria-label="HABIBI Home"
          data-node-id="195:103056"
        >
          <img
            src="/assets/figma/logo.png"
            alt="HABIBI"
            className={styles.logoImg}
          />
        </button>
      </div>

      {showCategories && (
        <nav
          className={styles.linksMenu}
          aria-label="Categorías del catálogo"
          data-node-id="195:103060"
        >
          {CATEGORIES.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  styles.menuButton,
                  isActive && styles.menuButtonActive,
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                <img
                  src={category.icon}
                  alt=""
                  aria-hidden="true"
                  className={styles.menuIcon}
                />
                <span>{t(`categories.${category.id}`)}</span>
              </button>
            );
          })}
        </nav>
      )}

      <div className={styles.rightControls} data-node-id="195:103066">
        <div
          className={styles.languageSwitch}
          role="group"
          aria-label="Selector de idioma"
          data-node-id="195:103067"
        >
          <button
            type="button"
            onClick={() => handleLanguageChange('en')}
            className={cn(
              styles.langOption,
              currentLang === 'en' && activeLangClass,
            )}
            aria-pressed={currentLang === 'en'}
            data-node-id="195:103068"
          >
            ENG
          </button>
          <button
            type="button"
            onClick={() => handleLanguageChange('es')}
            className={cn(
              styles.langOption,
              currentLang === 'es' && activeLangClass,
            )}
            aria-pressed={currentLang === 'es'}
            data-node-id="195:103070"
          >
            ES
          </button>
        </div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button
              type="button"
              className={styles.currencySelector}
              aria-label={`Moneda actual: ${currency}`}
              data-node-id="195:103072"
            >
              <span className={styles.currencyText}>{currency}</span>
              <img
                src="/assets/figma/chevron-down.svg"
                alt=""
                aria-hidden="true"
                className={styles.chevronIcon}
              />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className={styles.dropdownContent}
              sideOffset={6}
              align="end"
            >
              {CURRENCIES.map((code) => (
                <DropdownMenu.Item
                  key={code}
                  className={cn(
                    styles.dropdownItem,
                    currency === code && styles.dropdownItemActive,
                  )}
                  onSelect={() => setCurrency(code)}
                >
                  <span>{code}</span>
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  );
}
