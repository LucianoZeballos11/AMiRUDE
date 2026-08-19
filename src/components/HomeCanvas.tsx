import { useRef, useState, useCallback, useEffect } from 'react';
import { canvasItems, CANVAS_WIDTH, CANVAS_HEIGHT } from '@/data/canvasItems';
import type { CanvasItemData } from '@/data/canvasItems';
import CanvasItem from './CanvasItem';
import ItemViewer from './ItemViewer';

interface Props {
  active: boolean;
}

export default function HomeCanvas({ active }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: -120, y: -40 });
  const [openItem, setOpenItem] = useState<CanvasItemData | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const movedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Drag only starts when pressing the empty canvas surface, not an item.
  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (openItem) return;
      const target = e.target as HTMLElement;
      // Only begin drag from the surface itself (empty space)
      if (!target.classList.contains('canvas-surface')) return;
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        ox: offset.x,
        oy: offset.y,
      };
      movedRef.current = false;
      setIsDragging(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    },
    [offset.x, offset.y, openItem]
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) movedRef.current = true;
    setOffset({
      x: dragStart.current.ox + dx,
      y: dragStart.current.oy + dy,
    });
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    dragStart.current = null;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // noop
    }
  }, []);

  const handleOpen = useCallback((item: CanvasItemData) => {
    if (movedRef.current) return;
    setOpenItem(item);
  }, []);

  const closeViewer = useCallback(() => setOpenItem(null), []);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 overflow-hidden ${
        isMobile ? 'canvas-mobile' : 'canvas-desktop'
      } ${isDragging ? 'cursor-grabbing-canvas' : 'cursor-grab-canvas'} ${
        active ? 'opacity-100' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-700 ease-smooth`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Spatial field */}
      <div
        className="absolute canvas-surface"
        style={{
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
          transformOrigin: '0 0',
          transition: isDragging ? 'none' : 'transform 0.18s ease-smooth',
        }}
      >
        {canvasItems.map((item) => (
          <CanvasItem key={item.id} item={item} scale={1} onOpen={handleOpen} />
        ))}
      </div>

      {/* Hint label */}
      <div className="absolute bottom-6 left-5 sm:left-8 font-mono text-[10px] tracking-widest2 uppercase text-ash/70 pointer-events-none">
        {isMobile
          ? 'Arrastra el fondo · toca para abrir'
          : 'Drag the field · Click to open'}
      </div>

      {/* Coordinates readout */}
      <div className="absolute bottom-6 right-5 sm:right-8 font-mono text-[10px] tracking-widest2 uppercase text-ash/60 pointer-events-none tabular-nums">
        {String(Math.round(-offset.x)).padStart(4, '0')} /{' '}
        {String(Math.round(-offset.y)).padStart(4, '0')}
      </div>

      {openItem && <ItemViewer item={openItem} onClose={closeViewer} />}
    </div>
  );
}
