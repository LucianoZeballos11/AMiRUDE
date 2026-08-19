export type CategoryId = 'todo' | 'camisetas' | 'pantalones' | 'accesorios' | 'colecciones' | 'colaboraciones';

export interface ProductSize {
  label: string;
  available: boolean;
}

export interface Product {
  code: string;
  name: string;
  price: number;
  category: Exclude<CategoryId, 'todo' | 'colecciones' | 'colaboraciones'>;
  collection: string;
  description: string;
  details: string;
  materials: string;
  care: string;
  sizes: ProductSize[];
  images: string[];
  /** catalog layout slot — controls asymmetry */
  span: 'sm' | 'md' | 'lg' | 'xl';
  /** vertical offset within the catalog row for editorial rhythm */
  offset?: number;
}

export interface CategoryDef {
  id: CategoryId;
  label: string;
  count: number;
  kind: 'filter' | 'special';
}

export const categories: CategoryDef[] = [
  { id: 'todo', label: 'TODO', count: 12, kind: 'filter' },
  { id: 'camisetas', label: 'CAMISETAS', count: 4, kind: 'filter' },
  { id: 'pantalones', label: 'PANTALONES', count: 3, kind: 'filter' },
  { id: 'accesorios', label: 'ACCESORIOS', count: 3, kind: 'filter' },
  { id: 'colecciones', label: 'COLECCIONES', count: 1, kind: 'special' },
  { id: 'colaboraciones', label: 'COLABORACIONES', count: 0, kind: 'special' },
];

export const products: Product[] = [
  {
    code: 'AMR-001',
    name: 'CAMISETA 01',
    price: 390,
    category: 'camisetas',
    collection: 'Colección 01 — Origen',
    description: 'Algodón pesado. Construcción relajada. Hecho en Bolivia.',
    details: 'Cuello redondo. Manga corta. Corte boxy.',
    materials: '100% algodón peinado 240g.',
    care: 'Lavar en frío. Secar a la sombra.',
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
    ],
    images: [
      'https://images.pexels.com/photos/8148576/pexels-photo-8148576.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/37704845/pexels-photo-37704845.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'lg',
    offset: 0,
  },
  {
    code: 'AMR-003',
    name: 'CAMISETA ARCHIVO',
    price: 440,
    category: 'camisetas',
    collection: 'Colección 01 — Origen',
    description: 'Algodón lavado. Textura envejecida. Estampado manual.',
    details: 'Cuello redondo. Manga corta. Corte regular.',
    materials: '100% algodón 220g. Estampado serigráfico.',
    care: 'Lavar del revés. Agua fría.',
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: false },
      { label: 'XL', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/9594692/pexels-photo-9594692.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/34156905/pexels-photo-34156905.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'sm',
    offset: 60,
  },
  {
    code: 'AMR-006',
    name: 'LONG SLEEVE 01',
    price: 520,
    category: 'camisetas',
    collection: 'Colección 01 — Origen',
    description: 'Manga larga. Algodón denso. Caída estructurada.',
    details: 'Cuello redondo. Manga larga. Corte slim.',
    materials: '100% algodón 260g.',
    care: 'Lavar en frío. No usar lejía.',
    sizes: [
      { label: 'S', available: false },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/22441317/pexels-photo-22441317.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/35625406/pexels-photo-35625406.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'md',
    offset: 0,
  },
  {
    code: 'AMR-009',
    name: 'PANTALÓN 01',
    price: 690,
    category: 'pantalones',
    collection: 'Colección 01 — Origen',
    description: 'Pantalón de algodón. Tiro medio. Pierna recta.',
    details: 'Bolsillos laterales. Cintura elástica ajustable.',
    materials: '98% algodón, 2% elastano. Sarga 320g.',
    care: 'Lavar a 30°. Planchar a baja temperatura.',
    sizes: [
      { label: '28', available: true },
      { label: '30', available: true },
      { label: '32', available: false },
      { label: '34', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/2897533/pexels-photo-2897533.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/9464625/pexels-photo-9464625.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'md',
    offset: 40,
  },
  {
    code: 'AMR-011',
    name: 'CHAQUETA 01',
    price: 980,
    category: 'pantalones',
    collection: 'Colección 01 — Origen',
    description: 'Chaqueta de cuero. Forro interior. Construcción robusta.',
    details: 'Cremallera frontal. Dos bolsillos. Puños acanalados.',
    materials: 'Cuero sintético. Forro de algodón.',
    care: 'Limpiar en seco. No exponer a humedad.',
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
    ],
    images: [
      'https://images.pexels.com/photos/6981875/pexels-photo-6981875.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/38590640/pexels-photo-38590640.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/13524012/pexels-photo-13524012.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'xl',
    offset: 0,
  },
  {
    code: 'AMR-014',
    name: 'DENIM SHORT 01',
    price: 680,
    category: 'pantalones',
    collection: 'Colección 01 — Origen',
    description: 'Short de mezclilla. Lavado enzimático. Corte holgado.',
    details: 'Tiro medio. Cinco bolsillos. Bajo sin dobladillo.',
    materials: '100% algodón denim 12oz.',
    care: 'Lavar a máquina en frío. Secar al aire.',
    sizes: [
      { label: '28', available: true },
      { label: '30', available: true },
      { label: '32', available: true },
      { label: '34', available: false },
    ],
    images: [
      'https://images.pexels.com/photos/3093834/pexels-photo-3093834.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/10034420/pexels-photo-10034420.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'sm',
    offset: 0,
  },
  {
    code: 'AMR-017',
    name: 'GORRA 01',
    price: 290,
    category: 'accesorios',
    collection: 'Colección 01 — Origen',
    description: 'Gorra de sarga. Visera curva. Cierre ajustable.',
    details: 'Seis paneles. Cierre de hebilla. Logotipo bordado.',
    materials: '100% algodón sarga.',
    care: 'Limpiar con paño húmedo.',
    sizes: [
      { label: 'ÚNICA', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/12489838/pexels-photo-12489838.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/38622783/pexels-photo-38622783.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'sm',
    offset: 80,
  },
  {
    code: 'AMR-021',
    name: 'BOLSO 01',
    price: 480,
    category: 'accesorios',
    collection: 'Colección 01 — Origen',
    description: 'Bolso de lona. Asa de cuero. Interior forrado.',
    details: 'Cierre de cremallera. Bolsillo interior. Capacidad media.',
    materials: 'Lona de algodón. Asa de cuero genuino.',
    care: 'Limpiar en seco.',
    sizes: [
      { label: 'ÚNICA', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/18101857/pexels-photo-18101857.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/7747109/pexels-photo-7747109.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'md',
    offset: 0,
  },
  {
    code: 'AMR-024',
    name: 'HOODIE 01',
    price: 750,
    category: 'camisetas',
    collection: 'Colección 01 — Origen',
    description: 'Sudadera capucha. Algodón cepillado. Interior afelpado.',
    details: 'Capucha ajustable. Bolsillo canguro. Puños acanalados.',
    materials: '80% algodón, 20% poliéster. Felpa 380g.',
    care: 'Lavar del revés a 30°. No secar en máquina.',
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/10187254/pexels-photo-10187254.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/6537359/pexels-photo-6537359.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'lg',
    offset: 30,
  },
  {
    code: 'AMR-028',
    name: 'PANTALÓN 02',
    price: 610,
    category: 'pantalones',
    collection: 'Colección 01 — Origen',
    description: 'Pantalón de lino. Tiro alto. Pierna ancha.',
    details: 'Cintura elástica. Bolsillos laterales. Corte fluido.',
    materials: '100% lino.',
    care: 'Lavar a mano. Planchar con vapor.',
    sizes: [
      { label: 'S', available: true },
      { label: 'M', available: false },
      { label: 'L', available: true },
      { label: 'XL', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/31400265/pexels-photo-31400265.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/7716960/pexels-photo-7716960.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'md',
    offset: 50,
  },
  {
    code: 'AMR-031',
    name: 'CHAQUETA 02',
    price: 890,
    category: 'pantalones',
    collection: 'Colección 01 — Origen',
    description: 'Chaqueta de mezclilla. Lavado claro. Construcción ligera.',
    details: 'Botones frontales. Dos bolsillos pecho. Puños ajustables.',
    materials: '100% algodón denim 10oz.',
    care: 'Lavar a máquina en frío.',
    sizes: [
      { label: 'S', available: false },
      { label: 'M', available: true },
      { label: 'L', available: true },
      { label: 'XL', available: false },
    ],
    images: [
      'https://images.pexels.com/photos/13524012/pexels-photo-13524012.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/13973137/pexels-photo-13973137.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'lg',
    offset: 0,
  },
  {
    code: 'AMR-033',
    name: 'BOLSO 02',
    price: 520,
    category: 'accesorios',
    collection: 'Colección 01 — Origen',
    description: 'Bolso de cuero. Estructura rígida. Asa corta y larga.',
    details: 'Cierre magnético. Bolsillo interior. Base reforzada.',
    materials: 'Cuero genuino.',
    care: 'Limpiar con producto especializado.',
    sizes: [
      { label: 'ÚNICA', available: true },
    ],
    images: [
      'https://images.pexels.com/photos/33223468/pexels-photo-33223468.jpeg?auto=compress&cs=tinysrgb&w=900',
      'https://images.pexels.com/photos/36933384/pexels-photo-36933384.jpeg?auto=compress&cs=tinysrgb&w=900',
    ],
    span: 'sm',
    offset: 60,
  },
];

export const editorialImage =
  'https://images.pexels.com/photos/17490232/pexels-photo-17490232.jpeg?auto=compress&cs=tinysrgb&w=1400';

export function filterByCategory(cat: CategoryId): Product[] {
  if (cat === 'todo' || cat === 'colecciones' || cat === 'colaboraciones') {
    return products;
  }
  return products.filter((p) => p.category === cat);
}

export function formatPrice(n: number): string {
  return `Bs. ${n}`;
}
