import { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, X, Plus, Check } from 'lucide-react';
import {
  products,
  categories,
  filterByCategory,
  formatPrice,
  editorialImage,
  type Product,
  type CategoryId,
} from '@/data/products';

export interface BagItem {
  product: Product;
  size: string;
  qty: number;
}

type View = 'index' | 'catalog' | 'product';

interface Props {
  onNavigateHome: () => void;
}

export default function Tienda({ onNavigateHome }: Props) {
  const [view, setView] = useState<View>('index');
  const [activeCategory, setActiveCategory] = useState<CategoryId>('todo');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [bagOpen, setBagOpen] = useState(false);
  const [addedFlash, setAddedFlash] = useState(false);

  const catalogRef = useRef<HTMLDivElement>(null);

  const openCategory = useCallback((cat: CategoryId) => {
    setActiveCategory(cat);
    setView('catalog');
  }, []);

  const openProduct = useCallback((product: Product) => {
    setSelectedProduct(product);
    setView('product');
  }, []);

  const closeProduct = useCallback(() => {
    setSelectedProduct(null);
    setView('catalog');
  }, []);

  const addToBag = useCallback((product: Product, size: string) => {
    setBag((prev) => {
      const existing = prev.find((i) => i.product.code === product.code && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.product.code === product.code && i.size === size ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
    setAddedFlash(true);
    window.setTimeout(() => setAddedFlash(false), 1600);
  }, []);

  const bagCount = bag.reduce((n, i) => n + i.qty, 0);

  // keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (bagOpen) setBagOpen(false);
        else if (view === 'product') closeProduct();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, bagOpen, closeProduct]);

  // scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [view, activeCategory]);

  return (
    <main className="relative z-10 pt-16 min-h-screen">
      {/* Bag indicator — fixed top right */}
      <button
        onClick={() => setBagOpen(true)}
        className="fixed top-4 right-5 sm:right-8 z-40 font-mono text-[11px] tracking-widest2 uppercase text-ash hover:text-ink transition-colors duration-300 flex items-center gap-2"
      >
        <span>BOLSA</span>
        <span className="text-mist">/</span>
        <span className="tabular-nums text-ink">{String(bagCount).padStart(2, '0')}</span>
      </button>

      {/* Added flash */}
      <div
        className={`fixed top-16 left-1/2 -translate-x-1/2 z-50 font-mono text-[11px] tracking-widest2 uppercase text-ink bg-paper border border-mist/60 px-4 py-2 transition-all duration-400 ease-smooth ${
          addedFlash ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <span className="flex items-center gap-2">
          <Check size={13} strokeWidth={2} /> AGREGADO
        </span>
      </div>

      {view === 'index' && <IndexView onOpen={openCategory} onHome={onNavigateHome} />}

      {view === 'catalog' && (
        <CatalogView
          ref={catalogRef}
          category={activeCategory}
          onBack={() => setView('index')}
          onCategory={openCategory}
          onOpen={openProduct}
        />
      )}

      {view === 'product' && selectedProduct && (
        <ProductView
          product={selectedProduct}
          onBack={closeProduct}
          onAddToBag={addToBag}
        />
      )}

      {/* Bag panel */}
      <BagPanel
        open={bagOpen}
        items={bag}
        onClose={() => setBagOpen(false)}
        onRemove={(code, size) =>
          setBag((prev) => prev.filter((i) => !(i.product.code === code && i.size === size)))
        }
      />
    </main>
  );
}

/* ─────────────────────────────  INDEX  ───────────────────────────── */

function IndexView({
  onOpen,
  onHome,
}: {
  onOpen: (cat: CategoryId) => void;
  onHome: () => void;
}) {
  const filterCats = categories.filter((c) => c.kind === 'filter');
  const specialCats = categories.filter((c) => c.kind === 'special');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      {/* symbol */}
      <div className="mb-10 anim-fade">
        <div className="w-px h-8 bg-ink/30 mx-auto" />
        <div className="font-mono text-[9px] tracking-widest2 uppercase text-ash text-center mt-2">
          026
        </div>
      </div>

      <h1 className="font-serif text-5xl sm:text-7xl tracking-tightest text-ink mb-16 anim-rise">
        TIENDA
      </h1>

      <div className="flex flex-col gap-5 sm:gap-6 w-full max-w-md">
        {filterCats.map((c, i) => (
          <button
            key={c.id}
            onClick={() => onOpen(c.id)}
            className="group flex items-baseline gap-5 sm:gap-6 text-left anim-settle"
            style={{ animationDelay: `${0.15 + i * 0.08}s` }}
          >
            <span className="font-mono text-[11px] tracking-widest2 text-ash w-6 shrink-0">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="flex-1">
              <span className="block font-serif text-2xl sm:text-3xl text-ink group-hover:text-accent transition-colors duration-300">
                {c.label}
              </span>
            </span>
            <span className="font-mono text-[11px] tracking-widest2 tabular-nums text-mist group-hover:text-ink transition-colors">
              {String(c.count).padStart(2, '0')}
            </span>
          </button>
        ))}

        {/* special categories — quieter */}
        <div className="mt-8 flex flex-col gap-4 anim-settle" style={{ animationDelay: '0.5s' }}>
          {specialCats.map((c) => (
            <button
              key={c.id}
              onClick={() => onOpen(c.id)}
              className="group flex items-baseline gap-5 sm:gap-6 text-left"
            >
              <span className="font-mono text-[11px] tracking-widest2 text-mist w-6 shrink-0 group-hover:text-ash transition-colors">
                →
              </span>
              <span className="flex-1">
                <span className="block font-mono text-[12px] tracking-widest2 uppercase text-ash group-hover:text-ink transition-colors duration-300">
                  {c.label}
                </span>
              </span>
              <span className="font-mono text-[10px] tracking-widest2 tabular-nums text-mist">
                {String(c.count).padStart(2, '0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={onHome}
        className="mt-20 font-mono text-[9px] tracking-widest2 uppercase text-ash/60 hover:text-ink transition-colors anim-fade"
      >
        ← AMRUDE.COM
      </button>
    </div>
  );
}

/* ─────────────────────────────  CATALOG  ───────────────────────────── */

const spanClass: Record<Product['span'], string> = {
  sm: 'col-span-6 sm:col-span-4 lg:col-span-3',
  md: 'col-span-6 sm:col-span-5 lg:col-span-4',
  lg: 'col-span-12 sm:col-span-7 lg:col-span-5',
  xl: 'col-span-12 sm:col-span-8 lg:col-span-6',
};

const CatalogView = (() => {
  function CatalogViewInner(
    {
      category,
      onBack,
      onCategory,
      onOpen,
    }: {
      category: CategoryId;
      onBack: () => void;
      onCategory: (cat: CategoryId) => void;
      onOpen: (p: Product) => void;
    },
    ref: React.Ref<HTMLDivElement>
  ) {
    const list = filterByCategory(category);
    const activeCat = categories.find((c) => c.id === category);

    return (
      <div ref={ref} className="px-5 sm:px-8 lg:px-12 py-20 sm:py-24 max-w-7xl mx-auto">
        {/* top bar */}
        <div className="flex items-center justify-between mb-12 anim-fade">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-ash hover:text-ink transition-colors"
          >
            <ArrowLeft
              size={14}
              strokeWidth={1.5}
              className="transition-transform group-hover:-translate-x-1"
            />
            TIENDA
          </button>
          <span className="font-mono text-[11px] tracking-widest2 uppercase text-ash">
            {activeCat?.label} · {String(list.length).padStart(2, '0')}
          </span>
        </div>

        {/* category chips */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-16 anim-settle">
          {categories
            .filter((c) => c.kind === 'filter')
            .map((c) => (
              <button
                key={c.id}
                onClick={() => onCategory(c.id)}
                className={`font-mono text-[10px] tracking-widest2 uppercase transition-colors duration-300 ${
                  category === c.id
                    ? 'text-ink border-b border-ink pb-0.5'
                    : 'text-ash hover:text-ink'
                }`}
              >
                {c.label}
              </button>
            ))}
        </div>

        {/* product grid — asymmetric */}
        <div className="grid grid-cols-12 gap-x-4 sm:gap-x-6 gap-y-16 sm:gap-y-24">
          {list.map((product, i) => {
            // insert editorial interruption after the 5th product
            if (i === 5) {
              return (
                <div key={product.code} className="contents">
                  <EditorialInterruption />
                  <ProductCard key={product.code} product={product} index={i} onOpen={onOpen} />
                </div>
              );
            }
            return <ProductCard key={product.code} product={product} index={i} onOpen={onOpen} />;
          })}
        </div>
      </div>
    );
  }
  return forwardRefWrapper(CatalogViewInner);
})();

function forwardRefWrapper<P>(
  Component: (props: P, ref: React.Ref<HTMLDivElement>) => React.ReactElement
) {
  return (props: P & { ref?: React.Ref<HTMLDivElement> }) => {
    const { ref, ...rest } = props as P & { ref?: React.Ref<HTMLDivElement> };
    return Component(rest as P, ref ?? null);
  };
}

function ProductCard({
  product,
  index,
  onOpen,
}: {
  product: Product;
  index: number;
  onOpen: (p: Product) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const num = product.code.replace('AMR-', '');
  const hasSecond = product.images.length > 1;

  return (
    <div
      className={`${spanClass[product.span]} anim-settle`}
      style={{ animationDelay: `${Math.min(index * 0.06, 0.4)}s`, marginTop: `${product.offset ?? 0}px` }}
    >
      <button
        onClick={() => onOpen(product)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setImgIndex(0);
        }}
        className="group block w-full text-left cursor-inspect"
        aria-label={product.name}
      >
        {/* image */}
        <div className="relative overflow-hidden bg-mist/20">
          <img
            src={product.images[imgIndex]}
            alt={product.name}
            loading="lazy"
            draggable={false}
            className="w-full aspect-[3/4] object-cover transition-all duration-700 ease-smooth
              grayscale-[25%] brightness-[0.98] contrast-[1.01]
              group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-[1.03]"
          />
          {/* hover veil */}
          <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
          {/* secondary image crossfade on hover */}
          {hasSecond && (
            <img
              src={product.images[1]}
              alt=""
              aria-hidden
              draggable={false}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-smooth pointer-events-none ${
                hovered ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}
          {/* product number — top left */}
          <span className="absolute top-3 left-3 font-mono text-[9px] tracking-widest2 uppercase text-ink/60 transition-colors duration-500 group-hover:text-ink">
            {num}
          </span>
        </div>

        {/* metadata */}
        <div className="mt-3 flex items-baseline justify-between">
          <div>
            <span className="block font-serif text-base sm:text-lg text-ink leading-tight">
              {product.name}
            </span>
            <span className="block font-mono text-[10px] tracking-widest2 uppercase text-ash mt-1">
              {formatPrice(product.price)}
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-widest2 uppercase text-mist opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            VER →
          </span>
        </div>
      </button>
    </div>
  );
}

function EditorialInterruption() {
  return (
    <div className="col-span-12 my-8 anim-fade">
      <div className="relative overflow-hidden">
        <img
          src={editorialImage}
          alt="Colección 01 — La Paz / 2026"
          loading="lazy"
          className="w-full h-[40vh] sm:h-[50vh] object-cover grayscale-[20%] brightness-95"
        />
        <div className="absolute inset-0 bg-ink/20" />
        <div className="absolute bottom-6 left-6 sm:left-10">
          <div className="font-mono text-[10px] tracking-widest2 uppercase text-paper/80 mb-2">
            COLECCIÓN 01
          </div>
          <div className="font-serif text-2xl sm:text-4xl text-paper tracking-tightest">
            LA PAZ / 2026
          </div>
          <button className="group mt-4 inline-flex items-center gap-2 font-mono text-[10px] tracking-widest2 uppercase text-paper hover:text-accent transition-colors">
            VER HISTORIA
            <ArrowRight
              size={13}
              strokeWidth={1.5}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────  PRODUCT DETAIL  ───────────────────────────── */

function ProductView({
  product,
  onBack,
  onAddToBag,
}: {
  product: Product;
  onBack: () => void;
  onAddToBag: (p: Product, size: string) => void;
}) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const num = product.code.replace('AMR-', '');

  const handleAdd = () => {
    const size = selectedSize ?? product.sizes.find((s) => s.available)?.label;
    if (size) onAddToBag(product, size);
  };

  const infoSections = [
    { id: 'detalles', label: 'DETALLES', content: product.details },
    { id: 'materiales', label: 'MATERIALES', content: product.materials },
    { id: 'cuidado', label: 'CUIDADO', content: product.care },
    { id: 'talla', label: 'GUÍA DE TALLAS', content: 'Consulta la tabla de medidas en la sección de ayuda.' },
  ];

  return (
    <div className="px-5 sm:px-8 lg:px-12 py-20 sm:py-24 max-w-7xl mx-auto">
      {/* top bar */}
      <div className="flex items-center justify-between mb-12 anim-fade">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-ash hover:text-ink transition-colors"
        >
          <ArrowLeft
            size={14}
            strokeWidth={1.5}
            className="transition-transform group-hover:-translate-x-1"
          />
          TIENDA / {product.category.toUpperCase()}
        </button>
        <span className="font-mono text-[11px] tracking-widest2 uppercase text-ash">
          {product.code}
        </span>
      </div>

      <div className="grid grid-cols-12 gap-6 lg:gap-12">
        {/* image area — asymmetric, left dominant */}
        <div className="col-span-12 lg:col-span-7 anim-rise">
          <div className="relative">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              draggable={false}
              className="w-full aspect-[3/4] object-cover bg-mist/20"
            />
            {/* large product number overlay */}
            <span className="absolute top-4 left-4 font-mono text-[11px] tracking-widest2 uppercase text-ink/50">
              {num}
            </span>
          </div>

          {/* image index — not a thumbnail carousel, a numbered index */}
          {product.images.length > 1 && (
            <div className="mt-4 flex gap-3">
              {product.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`font-mono text-[10px] tracking-widest2 transition-colors duration-300 ${
                    activeImg === i
                      ? 'text-ink border-b border-ink pb-0.5'
                      : 'text-mist hover:text-ash'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* info column — right */}
        <div className="col-span-12 lg:col-span-5 anim-settle" style={{ animationDelay: '0.15s' }}>
          <div className="lg:sticky lg:top-24">
            <div className="font-mono text-[10px] tracking-widest2 uppercase text-ash mb-3">
              {product.collection}
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl tracking-tightest text-ink mb-6">
              {product.name}
            </h1>
            <div className="font-mono text-[13px] tracking-widest2 uppercase text-ink mb-8">
              {formatPrice(product.price)}
            </div>

            <p className="font-serif text-base leading-relaxed text-ink/75 mb-10 max-w-sm">
              {product.description}
            </p>

            {/* size selection */}
            <div className="mb-8">
              <div className="font-mono text-[10px] tracking-widest2 uppercase text-ash mb-4">
                TALLA
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((s) => {
                  const isSelected = selectedSize === s.label;
                  return (
                    <button
                      key={s.label}
                      disabled={!s.available}
                      onClick={() => setSelectedSize(s.label)}
                      className={`min-w-[3rem] px-4 py-2.5 font-mono text-[11px] tracking-widest2 uppercase border transition-all duration-300 ${
                        !s.available
                          ? 'border-mist/40 text-mist/50 line-through cursor-not-allowed'
                          : isSelected
                          ? 'border-ink bg-ink text-paper'
                          : 'border-ink/25 text-ink hover:border-ink'
                      }`}
                    >
                      {s.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* add to bag */}
            <button
              onClick={handleAdd}
              className="w-full py-4 font-mono text-[12px] tracking-widest2 uppercase text-paper bg-ink hover:bg-accent transition-colors duration-300"
            >
              AGREGAR A LA BOLSA
            </button>

            {/* info sections */}
            <div className="mt-10 border-t border-mist/50">
              {infoSections.map((sec) => (
                <div key={sec.id} className="border-b border-mist/50">
                  <button
                    onClick={() => setOpenSection(openSection === sec.id ? null : sec.id)}
                    className="group flex w-full items-center justify-between py-4 font-mono text-[10px] tracking-widest2 uppercase text-ash hover:text-ink transition-colors"
                  >
                    {sec.label}
                    <Plus
                      size={13}
                      strokeWidth={1.5}
                      className={`transition-transform duration-300 ${
                        openSection === sec.id ? 'rotate-45' : ''
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-smooth ${
                      openSection === sec.id ? 'max-h-32 pb-4' : 'max-h-0'
                    }`}
                  >
                    <p className="font-serif text-sm leading-relaxed text-ink/70 pr-4">
                      {sec.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────  BAG PANEL  ───────────────────────────── */

function BagPanel({
  open,
  items,
  onClose,
  onRemove,
}: {
  open: boolean;
  items: BagItem[];
  onClose: () => void;
  onRemove: (code: string, size: string) => void;
}) {
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);

  return (
    <>
      {/* backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-ink/30 transition-opacity duration-400 ease-smooth ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* panel — right side */}
      <aside
        className={`fixed top-0 right-0 bottom-0 z-[65] w-full max-w-sm bg-paper transition-transform duration-500 ease-smooth flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-mist/50">
          <span className="font-mono text-[11px] tracking-widest2 uppercase text-ink">
            BOLSA / {String(items.reduce((n, i) => n + i.qty, 0)).padStart(2, '0')}
          </span>
          <button
            onClick={onClose}
            className="font-mono text-[11px] tracking-widest2 uppercase text-ash hover:text-ink transition-colors flex items-center gap-2"
          >
            Cerrar <X size={14} strokeWidth={1.5} />
          </button>
        </div>

        {/* items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <div className="font-mono text-[10px] tracking-widest2 uppercase text-mist">
                La bolsa está vacía
              </div>
              <button
                onClick={onClose}
                className="font-mono text-[10px] tracking-widest2 uppercase text-ash hover:text-ink transition-colors"
              >
                EXPLORAR TIENDA →
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {items.map((item) => (
                <div key={`${item.product.code}-${item.size}`} className="flex gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover bg-mist/20 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[9px] tracking-widest2 uppercase text-ash">
                        {item.product.code}
                      </div>
                      <div className="font-serif text-base text-ink leading-tight mt-1">
                        {item.product.name}
                      </div>
                      <div className="font-mono text-[10px] tracking-widest2 uppercase text-ash mt-1">
                        TALLA {item.size} · {formatPrice(item.product.price)}
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove(item.product.code, item.size)}
                      className="font-mono text-[9px] tracking-widest2 uppercase text-mist hover:text-rust transition-colors self-start"
                    >
                      ELIMINAR
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* footer */}
        {items.length > 0 && (
          <div className="border-t border-mist/50 px-6 py-5">
            <div className="flex items-baseline justify-between mb-5">
              <span className="font-mono text-[11px] tracking-widest2 uppercase text-ash">
                TOTAL
              </span>
              <span className="font-mono text-[13px] tracking-widest2 uppercase text-ink tabular-nums">
                {formatPrice(total)}
              </span>
            </div>
            <button className="w-full py-3.5 font-mono text-[11px] tracking-widest2 uppercase text-paper bg-ink hover:bg-accent transition-colors duration-300 mb-2">
              VER BOLSA
            </button>
            <button className="w-full py-3.5 font-mono text-[11px] tracking-widest2 uppercase text-ink border border-ink/25 hover:border-ink transition-colors duration-300">
              FINALIZAR COMPRA
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
