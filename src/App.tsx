import { useState, useEffect } from 'react';
import GlobalNavigation from '@/components/GlobalNavigation';
import HomeCanvas from '@/components/HomeCanvas';
import Archivo9, { type ArchivoSection } from '@/components/Archivo9';
import Tienda from '@/components/Tienda';

type Page = 'home' | 'archivo9' | 'tienda';

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [archivoSection, setArchivoSection] = useState<ArchivoSection>('index');
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (next: Page) => {
    if (next === page) return;
    setTransitioning(true);
    window.setTimeout(() => {
      setPage(next);
      if (next === 'archivo9') setArchivoSection('index');
      window.setTimeout(() => setTransitioning(false), 60);
    }, 420);
  };

  const goHome = () => navigate('home');

  // Scroll to top when entering archivo sections
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [page, archivoSection]);

  return (
    <div className="relative min-h-screen bg-paper text-ink">
      <div className="grain" />

      <GlobalNavigation current={page} onNavigate={navigate} />

      {/* Transition veil */}
      <div
        className={`fixed inset-0 z-[55] bg-paper pointer-events-none transition-opacity duration-500 ease-smooth ${
          transitioning ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* HOME — spatial canvas */}
      <HomeCanvas active={page === 'home' && !transitioning} />

      {/* ARCHIVO9 — editorial */}
      {page === 'archivo9' && (
        <main
          className={`relative z-10 pt-16 transition-opacity duration-500 ease-smooth ${
            transitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Archivo9
            section={archivoSection}
            onBack={() => setArchivoSection('index')}
            onOpen={(s) => setArchivoSection(s)}
          />
        </main>
      )}

      {/* TIENDA — commerce */}
      {page === 'tienda' && (
        <main
          className={`relative z-10 transition-opacity duration-500 ease-smooth ${
            transitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <Tienda onNavigateHome={goHome} />
        </main>
      )}
    </div>
  );
}
