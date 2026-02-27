import { Metadata } from "next";
import { Workshop } from "@/types";

export const metadata: Metadata = {
  title: "Talleres - Yarina De Martino",
  description: "Formación y talleres de Yarina De Martino.",
};

const workshops: Workshop[] = [
  {
    id: "1",
    title: "Taller de Pintura Contemporánea",
    description: "Formación intensiva en técnicas de pintura contemporánea con énfasis en composición y color.",
    institution: "Escuela Nacional de Bellas Artes Prilidiano Pueyrredón",
    year: 2018,
    duration: "2 años",
  },
  {
    id: "2",
    title: "Seminario de Arte Brutalista",
    description: "Estudio profundo de la estética brutalista en arquitectura y su aplicación en las artes visuales.",
    institution: "Centro Cultural Rojas",
    year: 2019,
    duration: "6 meses",
  },
  {
    id: "3",
    title: "Clínica de Obra con Pablo Siquier",
    description: "Clínica intensiva de análisis y desarrollo de obra con el reconocido artista argentino.",
    institution: "Fundación PROA",
    year: 2020,
    duration: "3 meses",
  },
  {
    id: "4",
    title: "Taller de Técnicas Mixtas",
    description: "Exploración de materiales no convencionales y técnicas experimentales en pintura.",
    institution: "Taller de Barracas",
    year: 2019,
    duration: "1 año",
  },
  {
    id: "5",
    title: "Seminario de Teoría del Color",
    description: "Estudio teórico-práctico del color en el arte contemporáneo y su aplicación en la obra personal.",
    institution: "Universidad Nacional de las Artes",
    year: 2017,
    duration: "4 meses",
  },
  {
    id: "6",
    title: "Residencia Artística Internacional",
    description: "Residencia enfocada en el desarrollo de obra y networking con artistas internacionales.",
    institution: "Casa Tomada - Santiago de Chile",
    year: 2021,
    duration: "2 meses",
  },
];

export default function TalleresPage() {
  return (
    <div className="flex flex-col">
      <section className="container py-16 md:py-24">
        <div className="mb-16 space-y-4">
          <h1 className="animate-fade-in-left text-4xl font-light tracking-widest md:text-6xl">TALLERES</h1>
          <div className="h-1 w-24 bg-foreground animate-fade-in-left" style={{ animationDelay: '0.1s' }}></div>
          <p className="max-w-2xl text-lg font-light text-muted-foreground">
            Formación continua y desarrollo profesional a través de talleres, seminarios y residencias artísticas.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {workshops.map((workshop, index) => (
            <div 
              key={workshop.id} 
              className="group space-y-4 border border-foreground/20 p-8 transition-all hover:border-foreground hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-light tracking-wide">{workshop.title}</h3>
                <span className="text-xl font-light text-muted-foreground">{workshop.year}</span>
              </div>
              
              {workshop.institution && (
                <p className="text-sm font-light uppercase tracking-wider text-muted-foreground">
                  {workshop.institution}
                </p>
              )}
              
              {workshop.duration && (
                <p className="text-sm font-light text-muted-foreground">
                  Duración: {workshop.duration}
                </p>
              )}
              
              <p className="text-sm font-light leading-relaxed text-muted-foreground">
                {workshop.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
