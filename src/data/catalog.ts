export type CategoryId = 'vinos' | 'cervezas' | 'sakes' | 'licores' | 'cortes';

export type CountryOrigin =
  | 'México'
  | 'Francia'
  | 'Argentina'
  | 'Chile'
  | 'España'
  | 'Italia'
  | 'Estados Unidos'
  | 'Alemania'
  | 'Japón';

export interface CatalogItem {
  id: string;
  name: string;
  subtitle: string;
  category: CategoryId;
  priceMxn: number;
  country: CountryOrigin;
  image: string;
  detailImage?: string;
  descriptionEs: string;
  descriptionEn: string;
  producer: string;
  grapesEs: string;
  grapesEn: string;
  includedInPackage?: boolean;
  featuredSelected?: boolean;
}

export interface CategoryMeta {
  id: CategoryId;
  labelEs: string;
  labelEn: string;
  icon: string;
  totalResults: number;
}

export interface MapCountryPin {
  country: CountryOrigin;
  labelEs: string;
  labelEn: string;
  /** Percentage coordinates on the 1194x606 World Map canvas */
  xPercent: number;
  yPercent: number;
  /** Exact bounding box (in px on the 1194x606 World Map) for the glowing country silhouette */
  mapX: number;
  mapY: number;
  mapW: number;
  mapH: number;
  silhouetteImage: string;
  regionSubtitleEs: string;
  regionSubtitleEn: string;
  sommelierBadge: string;
  flagEmoji: string;
  flagSvg?: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'vinos',
    labelEs: 'Vinos',
    labelEn: 'Wines',
    icon: '/assets/figma/bottle.svg',
    totalResults: 20,
  },
  {
    id: 'cervezas',
    labelEs: 'Cervezas',
    labelEn: 'Beers',
    icon: '/assets/figma/beer.svg',
    totalResults: 20,
  },
  {
    id: 'sakes',
    labelEs: 'Sakes',
    labelEn: 'Sakes',
    icon: '/assets/figma/sake.svg',
    totalResults: 20,
  },
  {
    id: 'licores',
    labelEs: 'Licores',
    labelEn: 'Spirits',
    icon: '/assets/figma/liquor.svg',
    totalResults: 20,
  },
  {
    id: 'cortes',
    labelEs: 'Cortes',
    labelEn: 'Steaks',
    icon: '/assets/figma/meat.svg',
    totalResults: 20,
  },
];

export const MAP_COUNTRY_PINS: MapCountryPin[] = [
  {
    country: 'Francia',
    labelEs: 'Francia',
    labelEn: 'France',
    xPercent: 48.0,
    yPercent: 21.4,
    mapX: 553.79,
    mapY: 111.77,
    mapW: 41.77,
    mapH: 35.76,
    silhouetteImage: '/assets/figma/countries/france.png',
    regionSubtitleEs: 'Champagne · Bourgogne · Val de Loire',
    regionSubtitleEn: 'Champagne · Burgundy · Loire Valley',
    sommelierBadge: 'FRANCIA · 96+ PTS SOMMELIER',
    flagEmoji: '🇫🇷',
    flagSvg: '/assets/figma/flag-france.svg',
  },
  {
    country: 'México',
    labelEs: 'México',
    labelEn: 'Mexico',
    xPercent: 19.6,
    yPercent: 35.3,
    mapX: 187.08,
    mapY: 179.89,
    mapW: 95.17,
    mapH: 68.24,
    silhouetteImage: '/assets/figma/countries/mexico.png',
    regionSubtitleEs: 'Valle de Guadalupe · Parras · Querétaro',
    regionSubtitleEn: 'Guadalupe Valley · Parras · Queretaro',
    sommelierBadge: 'MÉXICO · 95+ PTS SOMMELIER',
    flagEmoji: '🇲🇽',
    flagSvg: '/assets/figma/flag-mexico.svg',
  },
  {
    country: 'Estados Unidos',
    labelEs: 'Estados Unidos',
    labelEn: 'United States',
    xPercent: 21.8,
    yPercent: 27.5,
    mapX: 44.13,
    mapY: 43.07,
    mapW: 1059.23,
    mapH: 188.4,
    silhouetteImage: '/assets/figma/countries/usa.png',
    regionSubtitleEs: 'Napa Valley · Sonoma · Willamette Valley',
    regionSubtitleEn: 'Napa Valley · Sonoma · Willamette Valley',
    sommelierBadge: 'EE. UU. · 95+ PTS SOMMELIER',
    flagEmoji: '🇺🇸',
    flagSvg: '/assets/figma/flag-usa.svg',
  },
  {
    country: 'España',
    labelEs: 'España',
    labelEn: 'Spain',
    xPercent: 45.8,
    yPercent: 26.2,
    mapX: 506.91,
    mapY: 138.58,
    mapW: 72.55,
    mapH: 60.37,
    silhouetteImage: '/assets/figma/countries/spain.png',
    regionSubtitleEs: 'Ribera del Duero · Rioja · Priorat',
    regionSubtitleEn: 'Ribera del Duero · Rioja · Priorat',
    sommelierBadge: 'ESPAÑA · 95+ PTS SOMMELIER',
    flagEmoji: '🇪🇸',
    flagSvg: '/assets/figma/flag-spain.svg',
  },
  {
    country: 'Italia',
    labelEs: 'Italia',
    labelEn: 'Italy',
    xPercent: 50.6,
    yPercent: 24.0,
    mapX: 586.75,
    mapY: 126.37,
    mapW: 35.94,
    mapH: 38.62,
    silhouetteImage: '/assets/figma/countries/italy.png',
    regionSubtitleEs: 'Toscana · Piemonte · Veneto',
    regionSubtitleEn: 'Tuscany · Piedmont · Veneto',
    sommelierBadge: 'ITALIA · 96+ PTS SOMMELIER',
    flagEmoji: '🇮🇹',
  },
  {
    country: 'Alemania',
    labelEs: 'Alemania',
    labelEn: 'Germany',
    xPercent: 50.1,
    yPercent: 18.4,
    mapX: 585.27,
    mapY: 97.77,
    mapW: 25.92,
    mapH: 27.93,
    silhouetteImage: '/assets/figma/countries/germany.png',
    regionSubtitleEs: 'Mosel · Rheingau · Pfalz',
    regionSubtitleEn: 'Mosel · Rheingau · Pfalz',
    sommelierBadge: 'ALEMANIA · 94+ PTS SOMMELIER',
    flagEmoji: '🇩🇪',
  },
  {
    country: 'Argentina',
    labelEs: 'Argentina',
    labelEn: 'Argentina',
    xPercent: 30.8,
    yPercent: 73.5,
    mapX: 341.46,
    mapY: 384.51,
    mapW: 50.63,
    mapH: 123.23,
    silhouetteImage: '/assets/figma/countries/argentina.png',
    regionSubtitleEs: 'Mendoza · Valle de Uco · Luján de Cuyo',
    regionSubtitleEn: 'Mendoza · Uco Valley · Lujan de Cuyo',
    sommelierBadge: 'ARGENTINA · 95+ PTS SOMMELIER',
    flagEmoji: '🇦🇷',
  },
  {
    country: 'Chile',
    labelEs: 'Chile',
    labelEn: 'Chile',
    xPercent: 28.5,
    yPercent: 71.0,
    mapX: 334.15,
    mapY: 368.45,
    mapW: 51.25,
    mapH: 142.46,
    silhouetteImage: '/assets/figma/countries/chile.png',
    regionSubtitleEs: 'Valle del Maipo · Colchagua · Casablanca',
    regionSubtitleEn: 'Maipo Valley · Colchagua · Casablanca',
    sommelierBadge: 'CHILE · 94+ PTS SOMMELIER',
    flagEmoji: '🇨🇱',
  },
  {
    country: 'Japón',
    labelEs: 'Japón',
    labelEn: 'Japan',
    xPercent: 82.5,
    yPercent: 28.3,
    mapX: 964.31,
    mapY: 132.23,
    mapW: 40.46,
    mapH: 79.37,
    silhouetteImage: '/assets/figma/countries/japan.png',
    regionSubtitleEs: 'Yamaguchi · Niigata · Yamanashi',
    regionSubtitleEn: 'Yamaguchi · Niigata · Yamanashi',
    sommelierBadge: 'JAPÓN · 97+ PTS SOMMELIER',
    flagEmoji: '🇯🇵',
  },
];

export const FEATURED_KRUG_ITEM: CatalogItem = {
  id: 'champagne-krug',
  name: 'Champagne Krug',
  subtitle: 'Grande Cuvée · Maison Krug',
  category: 'vinos',
  priceMxn: 410,
  country: 'Francia',
  image: '/assets/figma/wine-krug.png',
  detailImage: '/assets/figma/wine-krug.png',
  descriptionEs:
    'Champagne elaborado a partir de una mezcla de vinos de distintas añadas.',
  descriptionEn:
    'Champagne crafted from a prestigious blend of wines across multiple vintages.',
  producer: 'Maison Krug',
  grapesEs: 'Pinot Noir, Chardonnay y Meunier',
  grapesEn: 'Pinot Noir, Chardonnay & Meunier',
  includedInPackage: true,
};

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'wine-1',
    name: 'Reserva Malbec',
    subtitle: 'Gran Reserva · Valle de Guadalupe',
    category: 'vinos',
    priceMxn: 690,
    country: 'México',
    image: '/assets/figma/wine-1.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Vino tinto estructurado con notas de ciruela madura, cacao tostado y taninos sedosos.',
    descriptionEn:
      'Structured red wine with notes of ripe plum, roasted cocoa, and silky tannins.',
    producer: 'Bodegas Habibi Selección',
    grapesEs: 'Malbec 100%',
    grapesEn: '100% Malbec',
    includedInPackage: true,
    featuredSelected: true,
  },
  {
    id: 'wine-2',
    name: 'Cabernet Reserva',
    subtitle: 'Crianza en Roble Francés',
    category: 'vinos',
    priceMxn: 850,
    country: 'México',
    image: '/assets/figma/wine-2.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Intenso y elegante, con aromas de frutos negros, vainilla y especias suaves.',
    descriptionEn:
      'Intense and elegant, featuring black fruit aromas, vanilla, and gentle spices.',
    producer: 'Casa del Valle',
    grapesEs: 'Cabernet Sauvignon',
    grapesEn: 'Cabernet Sauvignon',
    featuredSelected: true,
  },
  {
    id: 'wine-3',
    name: 'Pinot Noir',
    subtitle: 'Parcela Seleccionada',
    category: 'vinos',
    priceMxn: 780,
    country: 'México',
    image: '/assets/figma/wine-3.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Delicado y expresivo, con notas de cereza roja, pétalos secos y final mineral.',
    descriptionEn:
      'Delicate and expressive, with red cherry notes, dried petals, and a mineral finish.',
    producer: 'Dominio Baja',
    grapesEs: 'Pinot Noir',
    grapesEn: 'Pinot Noir',
    includedInPackage: true,
    featuredSelected: true,
  },
  {
    id: 'wine-4',
    name: 'Merlot Roble',
    subtitle: 'Reserva Especial · Saint-Émilion',
    category: 'vinos',
    priceMxn: 590,
    country: 'Francia',
    image: '/assets/figma/wine-4.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Equilibrado y aterciopelado, con notas de mora silvestre, caramelo y roble tostado.',
    descriptionEn:
      'Balanced and velvety, with wild blackberry, caramel, and toasted oak notes.',
    producer: 'Château Saint-Émilion',
    grapesEs: 'Merlot, Cabernet Franc',
    grapesEn: 'Merlot, Cabernet Franc',
    featuredSelected: true,
  },
  {
    id: 'wine-5',
    name: 'Syrah del Valle',
    subtitle: 'Cosecha Tardía · Maipo',
    category: 'vinos',
    priceMxn: 720,
    country: 'Chile',
    image: '/assets/figma/wine-5.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Potente y especiado, con carácter de pimienta negra, arándanos y violetas.',
    descriptionEn:
      'Bold and spicy, with black pepper character, blueberries, and violets.',
    producer: 'Viña del Pacífico',
    grapesEs: 'Syrah 100%',
    grapesEn: '100% Syrah',
    includedInPackage: true,
    featuredSelected: true,
  },
  {
    id: 'wine-6',
    name: 'Chardonnay',
    subtitle: 'Bourgogne Blanc · Louis Latour',
    category: 'vinos',
    priceMxn: 620,
    country: 'Francia',
    image: '/assets/figma/wine-6.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Fresco y untuoso con aromas de manzana verde, mantequilla avellanada y cítricos.',
    descriptionEn:
      'Crisp and creamy with green apple, nutty butter, and citrus aromas.',
    producer: 'Maison Louis Latour',
    grapesEs: 'Chardonnay',
    grapesEn: 'Chardonnay',
    includedInPackage: true,
  },
  {
    id: 'wine-7',
    name: 'Sauvignon Blanc',
    subtitle: 'Val de Loire · Domaine Sancerre',
    category: 'vinos',
    priceMxn: 580,
    country: 'Francia',
    image: '/assets/figma/wine-7.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Vibrante acidez natural con notas herbáceas, maracuyá y toronja blanca.',
    descriptionEn:
      'Vibrant natural acidity with herbal notes, passionfruit, and white grapefruit.',
    producer: 'Domaine de Sancerre',
    grapesEs: 'Sauvignon Blanc',
    grapesEn: 'Sauvignon Blanc',
  },
  {
    id: 'wine-8',
    name: 'Chenin Blanc',
    subtitle: 'Viñedos Antiguos · Mendoza',
    category: 'vinos',
    priceMxn: 490,
    country: 'Argentina',
    image: '/assets/figma/wine-8.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Aromático y refrescante, con matices de pera blanca, miel de azahar y almendra.',
    descriptionEn:
      'Aromatic and refreshing, with white pear, orange blossom honey, and almond nuances.',
    producer: 'Finca Los Andes',
    grapesEs: 'Chenin Blanc',
    grapesEn: 'Chenin Blanc',
    includedInPackage: true,
  },
  {
    id: 'wine-9',
    name: 'Rosado de la Casa',
    subtitle: 'Toscana Rosato · Edición Cava',
    category: 'vinos',
    priceMxn: 450,
    country: 'Italia',
    image: '/assets/figma/wine-9.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Sutil y luminoso, con notas de fresa silvestre, durazno blanco y brisa mediterránea.',
    descriptionEn:
      'Subtle and luminous, with wild strawberry, white peach, and Mediterranean breeze notes.',
    producer: 'Tenuta San Guido',
    grapesEs: 'Sangiovese, Syrah',
    grapesEn: 'Sangiovese, Syrah',
    includedInPackage: true,
  },
  {
    id: 'wine-10',
    name: 'Rosé de Garnacha',
    subtitle: 'Rioja Alta · Edición Verano',
    category: 'vinos',
    priceMxn: 650,
    country: 'España',
    image: '/assets/figma/wine-10.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Expresivo rosado gastronómico con notas de frambuesa fresca y flores blancas.',
    descriptionEn:
      'Expressive gastronomic rosé with fresh raspberry and white floral notes.',
    producer: 'Bodegas Muga',
    grapesEs: 'Garnacha Tinta',
    grapesEn: 'Red Grenache',
  },
  {
    id: 'wine-11',
    name: 'Brut de la Casa',
    subtitle: 'Grande Cuvée · Maison Krug',
    category: 'vinos',
    priceMxn: 760,
    country: 'Francia',
    image: '/assets/figma/wine-11.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Champagne elaborado a partir de una mezcla de vinos de distintas añadas.',
    descriptionEn:
      'Champagne crafted from a blend of reserve wines across multiple vintages.',
    producer: 'Maison Krug',
    grapesEs: 'Pinot Noir, Chardonnay y Meunier',
    grapesEn: 'Pinot Noir, Chardonnay & Meunier',
    includedInPackage: true,
  },
  {
    id: 'wine-12',
    name: 'Espumoso Rosé',
    subtitle: 'Napa Valley · Método Tradicional',
    category: 'vinos',
    priceMxn: 890,
    country: 'Estados Unidos',
    image: '/assets/figma/wine-12.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Burbuja fina y persistente con aromas de frutos rojos del bosque y brioche.',
    descriptionEn:
      'Fine, persistent bubbles with red forest berry and toasted brioche aromas.',
    producer: 'Domaine Carneros',
    grapesEs: 'Chardonnay, Pinot Noir',
    grapesEn: 'Chardonnay, Pinot Noir',
    includedInPackage: true,
  },
  {
    id: 'wine-13',
    name: 'Tempranillo',
    subtitle: 'Ribera del Duero Reserva',
    category: 'vinos',
    priceMxn: 680,
    country: 'España',
    image: '/assets/figma/wine-13.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Cuerpo profundo con notas de cuero fino, higo maduro, tabaco y regaliz.',
    descriptionEn:
      'Deep body with fine leather, ripe fig, tobacco, and licorice notes.',
    producer: 'Pago de Carraovejas',
    grapesEs: 'Tempranillo, Cabernet Sauvignon',
    grapesEn: 'Tempranillo, Cabernet Sauvignon',
    includedInPackage: true,
  },
  {
    id: 'wine-14',
    name: 'Cabernet Franc',
    subtitle: 'Mendoza de Altura · Uco',
    category: 'vinos',
    priceMxn: 820,
    country: 'Argentina',
    image: '/assets/figma/wine-14.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Elegante carácter herbal, pimiento asado, cassis y taninos de grano fino.',
    descriptionEn:
      'Elegant herbal character, roasted pepper, cassis, and fine-grained tannins.',
    producer: 'Catena Zapata',
    grapesEs: 'Cabernet Franc 100%',
    grapesEn: '100% Cabernet Franc',
  },
  {
    id: 'wine-15',
    name: 'Riesling Seco',
    subtitle: 'Mosel Kabinett · Pizarra Azul',
    category: 'vinos',
    priceMxn: 740,
    country: 'Alemania',
    image: '/assets/figma/wine-15.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Mineralidad vibrante de pizarra azul con notas de lima, manzana y flor de sauco.',
    descriptionEn:
      'Vibrant blue-slate minerality with lime, crisp apple, and elderflower notes.',
    producer: 'Dr. Loosen',
    grapesEs: 'Riesling 100%',
    grapesEn: '100% Riesling',
    includedInPackage: true,
  },
  FEATURED_KRUG_ITEM,
  // Cervezas
  {
    id: 'beer-1',
    name: 'Reserva Porter',
    subtitle: 'Stout Imperial en Barrica',
    category: 'cervezas',
    priceMxn: 240,
    country: 'México',
    image: '/assets/figma/wine-2.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs: 'Cerveza artesanal oscura con notas de café expreso y cacao.',
    descriptionEn: 'Dark craft ale with espresso coffee and roasted cocoa notes.',
    producer: 'Cervecería de la Costa',
    grapesEs: 'Malta tostada, lúpulo noble',
    grapesEn: 'Roasted malt, noble hops',
    includedInPackage: true,
  },
  {
    id: 'beer-2',
    name: 'Saison Farmhouse',
    subtitle: 'Fermentación Abierta',
    category: 'cervezas',
    priceMxn: 260,
    country: 'Francia',
    image: '/assets/figma/wine-6.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs: 'Refrescante y especiada con notas cítricas y levadura belga.',
    descriptionEn: 'Refreshing and spicy with citrus notes and farmhouse yeast.',
    producer: 'Brasserie Thiriez',
    grapesEs: 'Cebada malteada, trigo',
    grapesEn: 'Malted barley, wheat',
  },
  // Sakes
  {
    id: 'sake-1',
    name: 'Junmai Daiginjo',
    subtitle: 'Pulido al 35% · Yamaguchi',
    category: 'sakes',
    priceMxn: 1450,
    country: 'Japón',
    image: '/assets/figma/wine-7.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Sake ultra-premium de textura sedosa y aromas florales de melón blanco.',
    descriptionEn:
      'Ultra-premium sake with a silky texture and floral white melon aromas.',
    producer: 'Dassai Brewery',
    grapesEs: 'Arroz Yamada Nishiki',
    grapesEn: 'Yamada Nishiki Rice',
    includedInPackage: true,
  },
  // Licores
  {
    id: 'liquor-1',
    name: 'Cognac XO Imperial',
    subtitle: 'Grande Champagne',
    category: 'licores',
    priceMxn: 2900,
    country: 'Francia',
    image: '/assets/figma/wine-11.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Destilado envejecido más de 20 años en barricas de roble de Limousin.',
    descriptionEn:
      'Aged over 20 years in Limousin oak casks with warm spice complexity.',
    producer: 'Maison Hennessy',
    grapesEs: 'Ugni Blanc',
    grapesEn: 'Ugni Blanc',
  },
  // Cortes
  {
    id: 'cut-1',
    name: 'Ribeye Wagyu A5',
    subtitle: 'Kagoshima · 400g',
    category: 'cortes',
    priceMxn: 3400,
    country: 'Japón',
    image: '/assets/figma/wine-1.png',
    detailImage: '/assets/figma/wine-krug.png',
    descriptionEs:
      'Marmoleo excepcional con textura mantequillosa y maridaje sugerido con Reserva Malbec.',
    descriptionEn:
      'Exceptional marbling with buttery texture and paired with Reserva Malbec.',
    producer: 'The Palace Butchery',
    grapesEs: 'Corte Certificado A5',
    grapesEn: 'Certified A5 Cut',
  },
];
