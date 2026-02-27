import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { MapClient } from "@/components/map-client";
import { Exhibition, Award } from "@/types";

const featuredExhibitions: Exhibition[] = [
  {
    id: "1",
    title: "Estructuras del Silencio",
    type: "individual",
    venue: "Galería Arte Contemporáneo",
    city: "Buenos Aires",
    country: "Argentina",
    year: 2023,
    coordinates: { lat: -34.6037, lng: -58.3816 },
  },
  {
    id: "2",
    title: "Hormigón y Pigmento",
    type: "individual",
    venue: "Centro Cultural Recoleta",
    city: "Buenos Aires",
    country: "Argentina",
    year: 2022,
    coordinates: { lat: -34.5875, lng: -58.3927 },
  },
  {
    id: "3",
    title: "Bienal de Arte Latinoamericano",
    type: "colectiva",
    venue: "Museo Nacional de Bellas Artes",
    city: "Santiago",
    country: "Chile",
    year: 2022,
    coordinates: { lat: -33.4372, lng: -70.6506 },
  },
];

const recentAwards: Award[] = [
  {
    id: "1",
    title: "Premio Nacional de Pintura",
    institution: "Fondo Nacional de las Artes",
    year: 2023,
  },
  {
    id: "2",
    title: "Mención de Honor - Salón Nacional",
    institution: "Palais de Glace",
    year: 2022,
  },
  {
    id: "3",
    title: "Beca de Creación",
    institution: "Fundación Antorchas",
    year: 2022,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="container grid min-h-[calc(100vh-10rem)] items-center gap-12 py-20 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <h1 className="animate-fade-in-left text-5xl font-light leading-tight tracking-widest md:text-6xl lg:text-7xl">
            YARINA<br />DE MARTINO
          </h1>
          <p className="animate-fade-in-left max-w-[500px] text-lg font-light text-muted-foreground" style={{ animationDelay: '0.2s' }}>
            Artista visual contemporánea. Exploración del brutalismo y el minimalismo a través de formas, texturas y espacios.
          </p>
          <Link 
            href="/obras" 
            className="group mt-4 flex w-fit items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-light uppercase tracking-widest transition-all hover:gap-4 animate-fade-in-left"
            style={{ animationDelay: '0.4s' }}
          >
            Ver Obras
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        
        <div className="relative h-[400px] md:h-[500px]">
          <div className="animate-fade-in-right absolute right-0 top-0 h-full w-[85%] border-2 border-foreground bg-muted transition-all hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)]" style={{ animationDelay: '0.3s' }}>
            <div className="flex h-full items-center justify-center">
              <span className="text-sm font-light text-muted-foreground">[Obra destacada]</span>
            </div>
          </div>
          <div className="animate-scale-in absolute bottom-8 left-0 h-32 w-32 border-2 border-foreground bg-background transition-all hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]" style={{ animationDelay: '0.6s' }}></div>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-muted/20">
        <div className="container py-20 md:py-32">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-light tracking-widest md:text-5xl">OBRA DESTACADA</h2>
            <div className="h-1 w-24 bg-foreground"></div>
          </div>
          
          <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
            <div className="animate-fade-in-left relative aspect-[4/3] overflow-hidden border-2 border-foreground bg-muted">
              <div className="flex h-full items-center justify-center">
                <span className="text-sm font-light text-muted-foreground">[Estructura I - 2023]</span>
              </div>
            </div>
            
            <div className="animate-fade-in-right flex flex-col justify-center space-y-6" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-3">
                <h3 className="text-2xl font-light tracking-wide">Estructura I</h3>
                <p className="text-sm font-light text-muted-foreground">
                  2023 · Acrílico sobre tela · 120 x 100 cm
                </p>
              </div>
              <p className="font-light leading-relaxed text-muted-foreground">
                Exploración de formas geométricas y espacios negativos. Una obra que dialoga con la arquitectura brutalista 
                y la búsqueda de lo esencial en la composición pictórica.
              </p>
              <Link 
                href="/obras" 
                className="group flex w-fit items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-light uppercase tracking-widest transition-all hover:gap-4"
              >
                Ver todas las obras
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="container py-20 md:py-32">
          <div className="mb-12 space-y-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-8 w-8" />
              <h2 className="text-3xl font-light tracking-widest md:text-5xl">EXPOSICIONES</h2>
            </div>
            <div className="h-1 w-24 bg-foreground"></div>
            <p className="max-w-2xl text-lg font-light text-muted-foreground">
              Presencia en espacios de arte de Argentina y Latinoamérica.
            </p>
          </div>
          
          <div className="animate-scale-in">
            <MapClient exhibitions={featuredExhibitions} />
          </div>
          
          <div className="mt-8 text-center">
            <Link 
              href="/exposiciones" 
              className="group inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-light uppercase tracking-widest transition-all hover:gap-4"
            >
              Ver todas las exposiciones
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10 bg-muted/20">
        <div className="container py-20 md:py-32">
          <div className="mb-12 space-y-4">
            <h2 className="text-3xl font-light tracking-widest md:text-5xl">RECONOCIMIENTOS</h2>
            <div className="h-1 w-24 bg-foreground"></div>
          </div>
          
          <div className="space-y-8">
            {recentAwards.map((award, index) => (
              <div 
                key={award.id}
                className="group flex items-start justify-between gap-8 border-l-4 border-foreground/20 pl-8 py-4 transition-all hover:border-foreground animate-fade-in-left"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-2">
                  <h3 className="text-xl font-light tracking-wide transition-transform group-hover:translate-x-2">
                    {award.title}
                  </h3>
                  <p className="text-sm font-light uppercase tracking-wider text-muted-foreground">
                    {award.institution}
                  </p>
                </div>
                <span className="text-2xl font-light text-muted-foreground">{award.year}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/premios" 
              className="group inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-light uppercase tracking-widest transition-all hover:gap-4"
            >
              Ver todos los premios
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-foreground/10">
        <div className="container py-20 md:py-32">
          <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-3">
            <div className="group space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-48 overflow-hidden border-2 border-foreground bg-muted transition-all duration-300 hover:-translate-y-2 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <div className="flex h-full items-center justify-center transition-transform group-hover:scale-105">
                  <span className="text-sm font-light text-muted-foreground">[Exposición]</span>
                </div>
              </div>
              <div className="h-1 w-16 bg-foreground transition-all duration-300 group-hover:w-24"></div>
              <h3 className="text-2xl font-light tracking-wide transition-transform group-hover:translate-x-2">Exposiciones</h3>
              <p className="font-light text-muted-foreground">
                Presencia en galerías y espacios de arte de Argentina y el mundo.
              </p>
              <Link 
                href="/exposiciones" 
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider transition-all hover:gap-3"
              >
                Explorar
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="group space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="relative h-48 overflow-hidden border-2 border-foreground bg-muted transition-all duration-300 hover:-translate-y-2 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <div className="flex h-full items-center justify-center transition-transform group-hover:scale-105">
                  <span className="text-sm font-light text-muted-foreground">[Premio]</span>
                </div>
              </div>
              <div className="h-1 w-16 bg-foreground transition-all duration-300 group-hover:w-24"></div>
              <h3 className="text-2xl font-light tracking-wide transition-transform group-hover:translate-x-2">Reconocimientos</h3>
              <p className="font-light text-muted-foreground">
                Premios y distinciones que destacan su trayectoria artística.
              </p>
              <Link 
                href="/premios" 
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider transition-all hover:gap-3"
              >
                Ver más
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="group space-y-4 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              <div className="relative h-48 overflow-hidden border-2 border-foreground bg-muted transition-all duration-300 hover:-translate-y-2 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <div className="flex h-full items-center justify-center transition-transform group-hover:scale-105">
                  <span className="text-sm font-light text-muted-foreground">[Taller]</span>
                </div>
              </div>
              <div className="h-1 w-16 bg-foreground transition-all duration-300 group-hover:w-24"></div>
              <h3 className="text-2xl font-light tracking-wide transition-transform group-hover:translate-x-2">Talleres</h3>
              <p className="font-light text-muted-foreground">
                Formación y desarrollo profesional en técnicas y conceptos artísticos.
              </p>
              <Link 
                href="/talleres" 
                className="inline-flex items-center gap-2 text-sm uppercase tracking-wider transition-all hover:gap-3"
              >
                Conocer
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

