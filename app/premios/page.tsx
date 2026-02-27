import { Metadata } from "next";
import { Award } from "@/types";

export const metadata: Metadata = {
  title: "Premios - Yarina De Martino",
  description: "Premios y reconocimientos de Yarina De Martino.",
};

const awards: Award[] = [
  {
    id: "1",
    title: "Premio Nacional de Pintura",
    institution: "Fondo Nacional de las Artes",
    year: 2023,
    description: "Reconocimiento a la trayectoria y aporte al arte contemporáneo argentino.",
  },
  {
    id: "2",
    title: "Mención de Honor - Salón Nacional de Artes Visuales",
    institution: "Palais de Glace",
    year: 2022,
    description: "Por la obra 'Hormigón y Pigmento', destacada en la sección de pintura.",
  },
  {
    id: "3",
    title: "Beca de Creación",
    institution: "Fundación Antorchas",
    year: 2022,
    description: "Beca para desarrollo de proyecto artístico sobre arquitectura brutalista.",
  },
  {
    id: "4",
    title: "Premio Adquisición",
    institution: "Museo de Arte Contemporáneo de Rosario",
    year: 2021,
    description: "Obra 'Plano Suspendido' adquirida para la colección permanente del museo.",
  },
  {
    id: "5",
    title: "Primer Premio - Concurso de Pintura Joven",
    institution: "Fundación OSDE",
    year: 2020,
    description: "Reconocimiento a artistas emergentes en el panorama del arte argentino.",
  },
  {
    id: "6",
    title: "Mención Especial del Jurado",
    institution: "Bienal de Arte Joven",
    year: 2019,
    description: "Destacada por su propuesta innovadora en el uso del espacio y la forma.",
  },
];

export default function PremiosPage() {
  return (
    <div className="flex flex-col">
      <section className="container py-16 md:py-24">
        <div className="mb-16 space-y-4">
          <h1 className="animate-fade-in-left text-4xl font-light tracking-widest md:text-6xl">PREMIOS</h1>
          <div className="h-1 w-24 bg-foreground animate-fade-in-left" style={{ animationDelay: '0.1s' }}></div>
          <p className="max-w-2xl text-lg font-light text-muted-foreground">
            Reconocimientos y distinciones que destacan el trabajo y la trayectoria artística.
          </p>
        </div>

        <div className="space-y-12">
          {awards.map((award, index) => (
            <div 
              key={award.id} 
              className="group relative border-l-4 border-foreground/20 pl-8 py-4 transition-all hover:border-foreground animate-fade-in-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="absolute -left-3 top-4 h-5 w-5 border-2 border-foreground bg-background transition-transform group-hover:rotate-45"></div>
              <div className="space-y-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <h3 className="text-xl font-light tracking-wide">{award.title}</h3>
                  <span className="text-2xl font-light text-muted-foreground">{award.year}</span>
                </div>
                <p className="text-sm font-light uppercase tracking-wider text-muted-foreground">
                  {award.institution}
                </p>
                {award.description && (
                  <p className="max-w-3xl text-sm font-light text-muted-foreground">
                    {award.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
