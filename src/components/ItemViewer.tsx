import { useEffect } from 'react';
import type { CanvasItemData } from '@/data/canvasItems';
import { X, Play, MapPin, ArrowRight } from 'lucide-react';

interface Props {
  item: CanvasItemData;
  onClose: () => void;
}

export default function ItemViewer({ item, onClose }: Props) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-8 anim-fade"
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-paper/85 backdrop-blur-md" />

      {/* close button */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 sm:top-6 sm:right-8 z-10 flex items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-ink hover:text-accent transition-colors"
        aria-label="Cerrar"
      >
        Cerrar <X size={14} strokeWidth={1.5} />
      </button>

      <div
        className="relative z-[1] w-full max-w-4xl flex flex-col md:flex-row gap-6 md:gap-10 items-center anim-rise"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="flex-1 max-w-md md:max-w-lg">
          <img
            src={item.src}
            alt={item.alt}
            className="w-full h-auto max-h-[70vh] object-contain"
            draggable={false}
          />
        </div>

        {/* Content panel */}
        <div className="flex-1 max-w-sm">
          <div className="font-mono text-[10px] tracking-widest2 uppercase text-ash mb-4">
            {item.type === 'image' && 'Imagen'}
            {item.type === 'story' && 'Historia'}
            {item.type === 'product' && 'Prenda'}
            {item.type === 'video' && 'Media'}
            {item.type === 'place' && 'Lugar'}
            {item.type === 'memory' && 'Memoria'}
            <span className="mx-2 text-mist">·</span>
            {item.label}
          </div>

          {item.type === 'image' && (
            <p className="font-serif text-lg leading-relaxed text-ink/80">{item.alt}</p>
          )}

          {item.type === 'story' && (
            <p className="font-serif text-xl leading-relaxed text-ink">{item.story}</p>
          )}

          {item.type === 'product' && item.product && (
            <div className="space-y-4">
              <div className="font-mono text-[11px] tracking-widest2 uppercase text-ash">
                AMRUDE
              </div>
              <h2 className="font-serif text-3xl leading-tight text-ink">
                {item.product.name}
              </h2>
              <div className="font-mono text-[11px] tracking-widest2 uppercase text-ash">
                {item.product.collection}
              </div>
              <button className="group inline-flex items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-ink hover:text-accent transition-colors mt-2">
                Ver en Tienda
                <ArrowRight
                  size={14}
                  strokeWidth={1.5}
                  className="transition-transform group-hover:translate-x-1"
                />
              </button>
            </div>
          )}

          {item.type === 'video' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-10 h-10 border border-ink/30 rounded-full">
                  <Play size={16} strokeWidth={1.5} className="text-ink ml-0.5" />
                </span>
                <span className="font-mono text-[11px] tracking-widest2 uppercase text-ash">
                  Media conceptual
                </span>
              </div>
              <p className="font-serif text-lg leading-relaxed text-ink/80">
                {item.alt}
              </p>
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-ash/70">
                Prototipo visual — media pendiente
              </p>
            </div>
          )}

          {item.type === 'place' && item.place && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-ash">
                <MapPin size={13} strokeWidth={1.5} />
                {item.place.location}
              </div>
              <div className="font-serif text-3xl text-ink">{item.place.date}</div>
              <p className="font-serif text-base leading-relaxed text-ink/70">
                {item.alt}
              </p>
            </div>
          )}

          {item.type === 'memory' && item.memory && (
            <div className="space-y-3">
              <div className="font-mono text-[10px] tracking-widest2 uppercase text-mist">
                Archivo
              </div>
              <div className="font-serif text-4xl text-ink tracking-tightest">
                {item.memory.location}
              </div>
              <div className="font-mono text-[12px] tracking-widest2 uppercase text-ash">
                {item.memory.date}
              </div>
              <div className="font-mono text-[11px] tracking-widest2 uppercase text-ash/80 pt-2 border-t border-mist/40">
                {item.memory.ref}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
