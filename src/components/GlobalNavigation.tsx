import { useState, useEffect } from 'react';

type Page = 'home' | 'archivo9' | 'tienda';

interface Props {
  current: Page;
  onNavigate: (page: Page) => void;
}

export default function GlobalNavigation({ current, onNavigate }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [current]);

  const go = (page: Page) => {
    onNavigate(page);
    setOpen(false);
  };

  const itemClass = (page: Page) =>
    `transition-colors duration-300 ${
      current === page ? 'text-ink' : 'text-ash hover:text-ink'
    }`;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 select-none">
        <div className="flex items-center justify-between px-5 sm:px-8 py-4">
          {/* Brand */}
          <button
            onClick={() => go('home')}
            className="font-mono text-[13px] tracking-widest2 text-ink hover:text-accent transition-colors duration-300"
            aria-label="AMRUDE.COM — Home"
          >
            AMRUDE.COM
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] tracking-widest2 uppercase">
            <button onClick={() => go('home')} className={itemClass('home')}>
              Home
            </button>
            <button onClick={() => go('archivo9')} className={itemClass('archivo9')}>
              Archivo9
            </button>
            <button onClick={() => go('tienda')} className={itemClass('tienda')}>
              Tienda
            </button>
            <span className="text-mist cursor-default" title="Próximamente">
              Explorar
            </span>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden font-mono text-[11px] tracking-widest2 uppercase text-ink"
            aria-label="Menú"
          >
            {open ? 'Cerrar' : 'Menú'}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden bg-paper border-t border-mist/40 anim-fade">
            <nav className="flex flex-col px-5 py-4 gap-4 font-mono text-[12px] tracking-widest2 uppercase">
              <button onClick={() => go('home')} className={itemClass('home')}>
                Home
              </button>
              <button onClick={() => go('archivo9')} className={itemClass('archivo9')}>
                Archivo9
              </button>
              <button onClick={() => go('tienda')} className={itemClass('tienda')}>
                Tienda
              </button>
              <span className="text-mist">Explorar — próximamente</span>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
