import { useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useTranslation } from 'react-i18next';
import { MAP_COUNTRY_PINS, type CountryOrigin } from '../../data/catalog';
import { useCatalog } from '../../context/CatalogContext';
import { cn, formatPrice } from '../../lib/utils';
import styles from './BottomBar.module.css';

export function BottomBar() {
  const { t, i18n } = useTranslation();
  const {
    viewMode,
    setViewMode,
    collectionFilter,
    setCollectionFilter,
    searchQuery,
    setSearchQuery,
    selectedOrigin,
    setSelectedOrigin,
    setHighlightedMapCountry,
    openCart,
    totalCartItems,
    totalCartAmountMxn,
    currency,
  } = useCatalog();
  const [countrySearch, setCountrySearch] = useState('');

  const isMap = viewMode === 'map';
  const isEn = i18n.language.startsWith('en');

  const handleOriginSelect = (country: CountryOrigin | null) => {
    setSelectedOrigin(country);
    if (country) {
      setHighlightedMapCountry(country);
    }
  };

  const handleCollectionSelect = (filter: 'all' | 'seleccionados') => {
    setCollectionFilter(filter);
    if (filter === 'all') {
      setSelectedOrigin(null);
    }
  };

  const selectedPin = selectedOrigin
    ? MAP_COUNTRY_PINS.find((p) => p.country === selectedOrigin)
    : null;

  const filteredCountries = MAP_COUNTRY_PINS.filter((pin) => {
    const q = countrySearch.trim().toLowerCase();
    if (!q) return true;
    return (
      pin.labelEs.toLowerCase().includes(q) ||
      pin.labelEn.toLowerCase().includes(q)
    );
  });

  const selectorLabel = selectedPin
    ? isEn
      ? selectedPin.labelEn
      : selectedPin.labelEs
    : collectionFilter === 'seleccionados'
      ? t('selectedWines')
      : t('allWines');

  return (
    <footer
      className={cn(
        styles.bottomBar,
        isMap ? styles.bottomBarMap : styles.bottomBarGrid,
      )}
      data-node-id="195:103085"
      data-name="Barra inferior de búsqueda y visualización"
    >
      {/* Search Bar + Origin Selector */}
      <div
        className={cn(
          styles.searchBar,
          isMap ? styles.searchBarMap : styles.searchBarGrid,
        )}
        data-node-id="195:103086"
        data-name="Buscar por nombre"
      >
        <div className={styles.searchInputGroup} data-node-id="195:103087">
          <img
            src="/assets/figma/search.svg"
            alt=""
            aria-hidden="true"
            className={styles.searchIcon}
            data-node-id="195:103088"
          />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            aria-label={t('searchPlaceholder')}
            className={styles.searchInput}
            data-node-id="195:103090"
          />
        </div>

        {!isMap && (
          <div className={styles.originSelectorContainer}>
            <span className={styles.dividerPipe} aria-hidden="true">
              |
            </span>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  type="button"
                  className={cn(
                    styles.originTrigger,
                    (collectionFilter === 'seleccionados' || selectedOrigin) &&
                      styles.originTriggerActive,
                  )}
                  aria-label={t('origin')}
                  data-node-id="146:62650"
                >
                  {selectedPin?.flagSvg && (
                    <img
                      src={selectedPin.flagSvg}
                      alt=""
                      aria-hidden="true"
                      className={styles.originFlag}
                    />
                  )}
                  <span>{selectorLabel}</span>
                  <img
                    src="/assets/figma/chevron-down.svg"
                    alt=""
                    aria-hidden="true"
                    className={styles.originChevron}
                  />
                </button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className={styles.originDropdown}
                  sideOffset={12}
                  align="center"
                  data-node-id="146:62891"
                >
                  <div className={styles.dropdownSection}>
                    <DropdownMenu.Item
                      className={cn(
                        styles.originDropdownItem,
                        collectionFilter === 'all' &&
                          !selectedOrigin &&
                          styles.originDropdownItemActive,
                      )}
                      onSelect={() => handleCollectionSelect('all')}
                    >
                      {collectionFilter === 'all' && !selectedOrigin ? (
                        <img
                          src="/assets/figma/radial-selected.svg"
                          alt=""
                          aria-hidden="true"
                          className={styles.radioIcon}
                        />
                      ) : (
                        <span className={styles.radioCircle} aria-hidden="true" />
                      )}
                      <span>{t('allWines')}</span>
                    </DropdownMenu.Item>

                    <DropdownMenu.Item
                      className={cn(
                        styles.originDropdownItem,
                        collectionFilter === 'seleccionados' &&
                          styles.originDropdownItemActive,
                      )}
                      onSelect={() => handleCollectionSelect('seleccionados')}
                    >
                      {collectionFilter === 'seleccionados' ? (
                        <img
                          src="/assets/figma/radial-selected.svg"
                          alt=""
                          aria-hidden="true"
                          className={styles.radioIcon}
                        />
                      ) : (
                        <span className={styles.radioCircle} aria-hidden="true" />
                      )}
                      <span>{t('selectedWines')}</span>
                    </DropdownMenu.Item>
                  </div>

                  <div className={styles.dropdownDivider} role="separator" />

                  <div className={styles.dropdownCountrySection}>
                    <p className={styles.dropdownSectionLabel}>{t('origin')}</p>
                    <div
                      className={styles.dropdownSearchBox}
                      onKeyDown={(e) => e.stopPropagation()}
                    >
                      <img
                        src="/assets/figma/search.svg"
                        alt=""
                        aria-hidden="true"
                        className={styles.dropdownSearchIcon}
                      />
                      <input
                        type="search"
                        value={countrySearch}
                        onChange={(e) => setCountrySearch(e.target.value)}
                        placeholder={t('searchShort')}
                        aria-label={t('searchShort')}
                        className={styles.dropdownSearchInput}
                      />
                    </div>

                    <div className={styles.countryScrollList}>
                      {filteredCountries.map((pin) => {
                        const isSelected = selectedOrigin === pin.country;
                        return (
                          <DropdownMenu.Item
                            key={pin.country}
                            className={cn(
                              styles.originDropdownItem,
                              isSelected && styles.originDropdownItemActive,
                            )}
                            onSelect={() =>
                              handleOriginSelect(isSelected ? null : pin.country)
                            }
                          >
                            <span
                              className={cn(
                                styles.countryCheckbox,
                                isSelected && styles.countryCheckboxChecked,
                              )}
                              aria-hidden="true"
                            />
                            {pin.flagSvg ? (
                              <img
                                src={pin.flagSvg}
                                alt=""
                                aria-hidden="true"
                                className={styles.originFlag}
                              />
                            ) : (
                              <span aria-hidden="true">{pin.flagEmoji}</span>
                            )}
                            <span>{isEn ? pin.labelEn : pin.labelEs}</span>
                          </DropdownMenu.Item>
                        );
                      })}
                    </div>
                  </div>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        )}
      </div>

      {/* View Mode Switch (Grid / Map) */}
      <div
        className={styles.viewSwitch}
        role="group"
        aria-label="Modo de visualización"
        data-node-id="195:103091"
      >
        <button
          type="button"
          onClick={() => setViewMode('grid')}
          className={cn(
            styles.viewSwitchBtn,
            !isMap && styles.viewSwitchBtnActiveGrid,
          )}
          aria-label={t('switchToGrid')}
          aria-pressed={!isMap}
          data-node-id="195:103092"
        >
          <img
            src={
              !isMap
                ? '/assets/figma/layout-grid-active.svg'
                : '/assets/figma/layout-grid.svg'
            }
            alt=""
            aria-hidden="true"
            className={styles.switchIcon}
          />
        </button>

        <button
          type="button"
          onClick={() => setViewMode('map')}
          className={cn(
            styles.viewSwitchBtn,
            isMap && styles.viewSwitchBtnActiveMap,
          )}
          aria-label={t('switchToMap')}
          aria-pressed={isMap}
          data-node-id="195:103094"
        >
          <img
            src={
              isMap ? '/assets/figma/map-active.svg' : '/assets/figma/map.svg'
            }
            alt=""
            aria-hidden="true"
            className={styles.switchIcon}
          />
        </button>
      </div>

      {/* Shopping Cart Pill Button */}
      <button
        type="button"
        onClick={openCart}
        className={styles.cartButton}
        data-node-id="195:103096"
      >
        <img
          src="/assets/figma/shopping-cart.svg"
          alt=""
          aria-hidden="true"
          className={styles.cartIcon}
          data-node-id="195:103098"
        />
        {isMap ? (
          <span data-node-id="195:103099">
            <span className={styles.cartTextRegular}>{t('totalLabel')} </span>
            <span className={styles.cartTextBold}>
              {formatPrice(totalCartAmountMxn, currency, false)}
            </span>
          </span>
        ) : (
          <span className={styles.cartTextMedium} data-node-id="146:60380">
            {totalCartItems > 0
              ? `${t('viewCart')} · ${totalCartItems}`
              : t('viewCart')}
          </span>
        )}
      </button>
    </footer>
  );
}
