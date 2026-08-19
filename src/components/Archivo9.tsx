import { ArrowLeft } from 'lucide-react';

export type ArchivoSection = 'index' | 'somos' | 'vision' | 'mision';

interface Props {
  section: ArchivoSection;
  onBack: () => void;
  onOpen: (s: ArchivoSection) => void;
}

export default function Archivo9({ section, onBack, onOpen }: Props) {
  if (section === 'index') return <IndexView onOpen={onOpen} />;
  if (section === 'somos') return <SomosView onBack={onBack} />;
  if (section === 'vision') return <VisionView onBack={onBack} />;
  return <MisionView onBack={onBack} />;
}

function IndexView({ onOpen }: { onOpen: (s: ArchivoSection) => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      {/* small symbol */}
      <div className="mb-10 anim-fade">
        <div className="w-px h-8 bg-ink/30 mx-auto" />
        <div className="font-mono text-[9px] tracking-widest2 uppercase text-ash text-center mt-2">
          009
        </div>
      </div>

      <h1 className="font-serif text-5xl sm:text-7xl tracking-tightest text-ink mb-16 anim-rise">
        ARCHIVO9
      </h1>

      <div className="flex flex-col gap-5 sm:gap-6 w-full max-w-md">
        {([
          { n: '01', key: 'somos', title: 'QUIÉNES SOMOS', sub: 'Historia' },
          { n: '02', key: 'vision', title: 'VISIÓN', sub: '' },
          { n: '03', key: 'mision', title: 'MISIÓN', sub: '' },
        ] as const).map((e, i) => (
          <button
            key={e.key}
            onClick={() => onOpen(e.key)}
            className="group flex items-baseline gap-5 sm:gap-6 text-left anim-settle"
            style={{ animationDelay: `${0.15 + i * 0.08}s` }}
          >
            <span className="font-mono text-[11px] tracking-widest2 text-ash w-6 shrink-0">
              {e.n}
            </span>
            <span className="flex-1">
              <span className="block font-serif text-2xl sm:text-3xl text-ink group-hover:text-accent transition-colors duration-300">
                {e.title}
              </span>
              {e.sub && (
                <span className="block font-mono text-[10px] tracking-widest2 uppercase text-ash mt-1">
                  {e.sub}
                </span>
              )}
            </span>
            <span className="font-mono text-[11px] tracking-widest2 text-mist group-hover:text-ink transition-colors">
              →
            </span>
          </button>
        ))}
      </div>

      <div className="mt-20 font-mono text-[9px] tracking-widest2 uppercase text-ash/60 anim-fade">
        AMRUDE · Documento permanente
      </div>
    </div>
  );
}

function SectionShell({
  index,
  total,
  title,
  onBack,
  children,
}: {
  index: string;
  total: string;
  title: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen px-5 sm:px-10 lg:px-16 py-20 sm:py-24 max-w-5xl mx-auto">
      {/* top bar */}
      <div className="flex items-center justify-between mb-16 anim-fade">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 font-mono text-[11px] tracking-widest2 uppercase text-ash hover:text-ink transition-colors"
        >
          <ArrowLeft size={14} strokeWidth={1.5} className="transition-transform group-hover:-translate-x-1" />
          ARCHIVO9
        </button>
        <span className="font-mono text-[11px] tracking-widest2 uppercase text-ash">
          {index} / {total}
        </span>
      </div>

      <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tightest text-ink mb-16 anim-rise">
        {title}
      </h1>

      <div className="anim-settle" style={{ animationDelay: '0.15s' }}>
        {children}
      </div>
    </div>
  );
}

function SomosView({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="01" total="03" title={['QUIÉNES', 'SOMOS'].join('\n')} onBack={onBack}>
      <figure className="mb-12">
        <img
          src="https://images.pexels.com/photos/7779765/pexels-photo-7779765.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Estudio AMRUDE — preparación de sesión"
          className="w-full h-auto object-cover"
        />
      </figure>

      <p className="font-serif text-xl sm:text-2xl leading-relaxed text-ink max-w-2xl mb-16">
        AMRUDE comenzó como una conversación entre dos amigos en una ciudad que
        no pertenecía a ninguno de los dos. No buscábamos hacer ropa. Buscábamos
        una forma de permanecer.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 mb-8">
        {[
          {
            year: '2022',
            text: 'Las primeras tres prendas, cosidas a mano en un apartamento prestado. Sin etiqueta, sin nombre.',
          },
          {
            year: '2024',
            text: 'AMRUDE se vuelve pública. La primera colección se presenta sin pasarela, solo en un departamento.',
          },
          {
            year: '2026',
            text: 'ARCHIVO9 abre como documento permanente. La marca deja de ser un catálogo y se vuelve un mundo.',
          },
        ].map((e) => (
          <div key={e.year}>
            <div className="font-mono text-[11px] tracking-widest2 uppercase text-ash mb-3">
              {e.year}
            </div>
            <p className="font-serif text-base leading-relaxed text-ink/75">{e.text}</p>
          </div>
        ))}
      </div>

      <figure className="mt-12">
        <img
          src="https://images.pexels.com/photos/9849320/pexels-photo-9849320.jpeg?auto=compress&cs=tinysrgb&w=1000"
          alt="Diseñador esbozando prendas con muestras de tela"
          className="w-full h-auto object-cover"
        />
      </figure>
    </SectionShell>
  );
}

function VisionView({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="02" total="03" title="VISIÓN" onBack={onBack}>
      <div className="max-w-3xl mb-16">
        <p className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-ink">
          Vamos hacia una moda que no pide permiso para existir — lenta, local,
          y profundamente humana.
        </p>
      </div>

      <figure className="mb-12">
        <img
          src="https://images.pexels.com/photos/16569537/pexels-photo-16569537.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Arquitectura minimalista en blanco y negro"
          className="w-full h-auto object-cover"
        />
      </figure>

      <p className="font-serif text-lg leading-relaxed text-ink/75 max-w-2xl">
        AMRUDE imagina un futuro donde la ropa no se consume, se conserva. Donde
        cada prenda tiene una biografía y un lugar al que regresar.
      </p>
    </SectionShell>
  );
}

function MisionView({ onBack }: { onBack: () => void }) {
  return (
    <SectionShell index="03" total="03" title="MISIÓN" onBack={onBack}>
      <figure className="mb-12">
        <img
          src="https://images.pexels.com/photos/4287637/pexels-photo-4287637.jpeg?auto=compress&cs=tinysrgb&w=1200"
          alt="Preparación de modelo en backstage"
          className="w-full h-auto object-cover"
        />
      </figure>

      <div className="max-w-3xl mb-12">
        <p className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-[1.15] tracking-tight text-ink">
          Por qué hacemos ropa.
        </p>
      </div>

      <p className="font-serif text-xl sm:text-2xl leading-relaxed text-ink max-w-2xl mb-10">
        AMRUDE existe para vestir a personas que no quieren desaparecer en la
        ropa. Hacemos prendas que sostienen una identidad, no que la borran.
      </p>

      <p className="font-serif text-base leading-relaxed text-ink/70 max-w-2xl">
        Trabajamos en series cortas, con manos que reconocemos, en ciudades que
        nos reconocen. La misión no es crecer. Es permanecer.
      </p>
    </SectionShell>
  );
}
