import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  CATALOG_ITEMS,
  FEATURED_KRUG_ITEM,
  type CatalogItem,
  type CategoryId,
  type CountryOrigin,
} from '../data/catalog';
import type { CurrencyCode } from '../lib/utils';

export type ViewMode = 'grid' | 'map' | 'visual';
export type CollectionFilter = 'all' | 'seleccionados';

export interface CartEntry {
  item: CatalogItem;
  quantity: number;
}

interface CatalogContextValue {
  activeCategory: CategoryId;
  setActiveCategory: (category: CategoryId) => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  collectionFilter: CollectionFilter;
  setCollectionFilter: (filter: CollectionFilter) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedOrigin: CountryOrigin | null;
  setSelectedOrigin: (origin: CountryOrigin | null) => void;
  highlightedMapCountry: CountryOrigin;
  setHighlightedMapCountry: (country: CountryOrigin) => void;
  mapZoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetMapZoom: () => void;
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  filteredItems: CatalogItem[];
  selectedProduct: CatalogItem | null;
  openProductDetail: (item: CatalogItem) => void;
  closeProductDetail: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  cartEntries: CartEntry[];
  getItemQuantity: (itemId: string) => number;
  incrementItem: (item: CatalogItem, count?: number) => void;
  decrementItem: (itemId: string) => void;
  removeItem: (itemId: string) => void;
  totalCartItems: number;
  totalCartAmountMxn: number;
}

const CatalogContext = createContext<CatalogContextValue | undefined>(undefined);

interface CatalogProviderProps {
  children: React.ReactNode;
  initialViewMode?: ViewMode;
}

export function CatalogProvider({
  children,
  initialViewMode = 'map',
}: CatalogProviderProps) {
  const [activeCategory, setActiveCategoryState] = useState<CategoryId>('vinos');
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [collectionFilter, setCollectionFilter] =
    useState<CollectionFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrigin, setSelectedOrigin] = useState<CountryOrigin | null>(null);
  const [highlightedMapCountry, setHighlightedMapCountry] =
    useState<CountryOrigin>('Francia');
  const [mapZoom, setMapZoom] = useState<number>(1);
  const [currency, setCurrency] = useState<CurrencyCode>('MXN');

  const [selectedProduct, setSelectedProduct] = useState<CatalogItem | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Start with empty cart so Map view (195:103052) shows "Total: $0.00" out of the box,
  // and adding items updates to "Ver carrito · N" and populates the Cart Drawer (212:111524).
  const [cartMap, setCartMap] = useState<Record<string, CartEntry>>({});

  const setActiveCategory = (category: CategoryId) => {
    setActiveCategoryState(category);
    setSelectedOrigin(null);
    setCollectionFilter('all');
  };

  const zoomIn = () => setMapZoom((prev) => Math.min(prev + 0.25, 2.25));
  const zoomOut = () => setMapZoom((prev) => Math.max(prev - 0.25, 0.75));
  const resetMapZoom = () => setMapZoom(1);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return CATALOG_ITEMS.filter((item) => {
      if (item.id === 'champagne-krug') return false; // Displayed when opening Krug detail or searching
      if (item.category !== activeCategory) return false;
      if (
        collectionFilter === 'seleccionados' &&
        !item.featuredSelected &&
        !cartMap[item.id]
      ) {
        return false;
      }
      if (selectedOrigin && item.country !== selectedOrigin) return false;
      if (q.length > 0) {
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesSub = item.subtitle.toLowerCase().includes(q);
        const matchesCountry = item.country.toLowerCase().includes(q);
        const matchesProducer = item.producer.toLowerCase().includes(q);
        return matchesName || matchesSub || matchesCountry || matchesProducer;
      }
      return true;
    });
  }, [activeCategory, collectionFilter, cartMap, selectedOrigin, searchQuery]);

  const openProductDetail = (item: CatalogItem) => {
    // In Figma (26:540), tapping a wine card showcases the Champagne Krug detail sheet
    // while keeping the selected item's data accessible; we enrich with Krug or the item itself.
    setSelectedProduct(item.id === 'wine-11' ? FEATURED_KRUG_ITEM : item);
  };

  const closeProductDetail = () => setSelectedProduct(null);
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  const getItemQuantity = (itemId: string): number => {
    return cartMap[itemId]?.quantity ?? 0;
  };

  const incrementItem = (item: CatalogItem, count = 1) => {
    setCartMap((prev) => {
      const existing = prev[item.id];
      return {
        ...prev,
        [item.id]: {
          item,
          quantity: existing ? existing.quantity + count : count,
        },
      };
    });
  };

  const decrementItem = (itemId: string) => {
    setCartMap((prev) => {
      const existing = prev[itemId];
      if (!existing) return prev;
      if (existing.quantity <= 1) {
        const next = { ...prev };
        delete next[itemId];
        return next;
      }
      return {
        ...prev,
        [itemId]: {
          ...existing,
          quantity: existing.quantity - 1,
        },
      };
    });
  };

  const removeItem = (itemId: string) => {
    setCartMap((prev) => {
      const next = { ...prev };
      delete next[itemId];
      return next;
    });
  };

  const cartEntries = useMemo(() => Object.values(cartMap), [cartMap]);

  const totalCartItems = useMemo(
    () => cartEntries.reduce((sum, entry) => sum + entry.quantity, 0),
    [cartEntries],
  );

  const totalCartAmountMxn = useMemo(
    () =>
      cartEntries.reduce(
        (sum, entry) => sum + entry.item.priceMxn * entry.quantity,
        0,
      ),
    [cartEntries],
  );

  const value: CatalogContextValue = {
    activeCategory,
    setActiveCategory,
    viewMode,
    setViewMode,
    collectionFilter,
    setCollectionFilter,
    searchQuery,
    setSearchQuery,
    selectedOrigin,
    setSelectedOrigin,
    highlightedMapCountry,
    setHighlightedMapCountry,
    mapZoom,
    zoomIn,
    zoomOut,
    resetMapZoom,
    currency,
    setCurrency,
    filteredItems,
    selectedProduct,
    openProductDetail,
    closeProductDetail,
    isCartOpen,
    openCart,
    closeCart,
    cartEntries,
    getItemQuantity,
    incrementItem,
    decrementItem,
    removeItem,
    totalCartItems,
    totalCartAmountMxn,
  };

  return (
    <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCatalog(): CatalogContextValue {
  const ctx = useContext(CatalogContext);
  if (!ctx) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return ctx;
}
