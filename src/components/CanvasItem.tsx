import { memo } from 'react';
import type { CanvasItemData } from '@/data/canvasItems';

interface Props {
  item: CanvasItemData;
  scale: number;
  onOpen: (item: CanvasItemData) => void;
}

const typeGlyph: Record<string, string> = {
  image: 'IMG',
  story: 'TXT',
  product: 'PRD',
  video: 'VID',
  place: 'PLC',
  memory: 'MEM',
};

function CanvasItemBase({ item, scale, onOpen }: Props) {
  const w = item.w * scale;
  // Aspect ratio derived from size bucket — keeps composition irregular but stable
  const aspect =
    item.size === 'xs'
      ? 1.35
      : item.size === 'sm'
      ? 1.4
      : item.size === 'md'
      ? 1.5
      : item.size === 'lg'
      ? 1.45
      : 1.3;
  const h = w / aspect;

  return (
    <div
      className="absolute canvas-item group"
      style={{
        left: item.x * scale,
        top: item.y * scale,
        width: w,
        height: h,
        transform: `rotate(${item.rot ?? 0}deg)`,
      }}
    >
      <button
        onClick={() => onOpen(item)}
        className="relative block w-full h-full overflow-hidden bg-mist/30 cursor-inspect"
        aria-label={item.alt}
      >
        <img
          src={item.src}
          alt={item.alt}
          loading="lazy"
          draggable={false}
          className="w-full h-full object-cover transition-all duration-700 ease-smooth
            grayscale-[35%] brightness-[0.97] contrast-[1.02]
            group-hover:grayscale-0 group-hover:brightness-105 group-hover:scale-[1.04]"
        />
        {/* hover veil */}
        <span className="absolute inset-0 bg-ink/0 group-hover:bg-ink/5 transition-colors duration-500" />
        {/* type tick on hover */}
        <span className="absolute top-2 left-2 font-mono text-[8px] tracking-widest2 uppercase text-paper bg-ink/0 group-hover:bg-ink/70 px-1.5 py-0.5 transition-all duration-500 opacity-0 group-hover:opacity-100">
          {typeGlyph[item.type]} · {item.label}
        </span>
      </button>

      {/* utilitarian label — always visible, subtle */}
      <div className="absolute -bottom-5 left-0 flex items-center gap-1.5 font-mono text-[8px] tracking-widest2 uppercase text-ash/70">
        <span className="text-mist/80">{typeGlyph[item.type]}</span>
        <span>{item.label}</span>
      </div>
    </div>
  );
}

const CanvasItem = memo(CanvasItemBase);
export default CanvasItem;
