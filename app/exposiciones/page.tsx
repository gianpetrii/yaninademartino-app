"use client";

import { Exhibition } from "@/types";
import { MapClient } from "@/components/map-client";

const exhibitions: Exhibition[] = [
  {
    id: "1",
    title: "Estructuras del Silencio",
    type: "individual",
    venue: "Galería Arte Contemporáneo",
    city: "Buenos Aires",
    country: "Argentina",
    year: 2023,
    startDate: "2023-08-15",
    endDate: "2023-09-30",
    description: "Exposición individual que explora la relación entre el espacio vacío y la forma construida.",
    coordinates: { lat: -34.6037, lng: -58.3816 },
  },
  {
    id: "2",
    title: "Colectiva de Arte Contemporáneo",
    type: "colectiva",
    venue: "Museo de Arte Moderno",
    city: "Córdoba",
    country: "Argentina",
    year: 2023,
    startDate: "2023-05-10",
    endDate: "2023-07-20",
    coordinates: { lat: -31.4201, lng: -64.1888 },
  },
  {
    id: "3",
    title: "Hormigón y Pigmento",
    type: "individual",
    venue: "Centro Cultural Recoleta",
    city: "Buenos Aires",
    country: "Argentina",
    year: 2022,
    startDate: "2022-11-05",
    endDate: "2022-12-20",
    description: "Serie inspirada en la arquitectura brutalista de Buenos Aires.",
    coordinates: { lat: -34.5875, lng: -58.3927 },
  },
  {
    id: "4",
    title: "Bienal de Arte Latinoamericano",
    type: "colectiva",
    venue: "Museo Nacional de Bellas Artes",
    city: "Santiago",
    country: "Chile",
    year: 2022,
    startDate: "2022-06-15",
    endDate: "2022-08-30",
    coordinates: { lat: -33.4372, lng: -70.6506 },
  },
  {
    id: "5",
    title: "Formas Esenciales",
    type: "individual",
    venue: "Galería Zurbarán",
    city: "Buenos Aires",
    country: "Argentina",
    year: 2021,
    startDate: "2021-09-10",
    endDate: "2021-10-25",
    description: "Primera exposición individual enfocada en el minimalismo geométrico.",
    coordinates: { lat: -34.5895, lng: -58.4173 },
  },
  {
    id: "6",
    title: "Nuevas Voces del Arte Argentino",
    type: "colectiva",
    venue: "Fundación OSDE",
    city: "Buenos Aires",
    country: "Argentina",
    year: 2021,
    coordinates: { lat: -34.5956, lng: -58.3772 },
  },
];

export default function ExposicionesPage() {
  const individualExhibitions = exhibitions.filter(e => e.type === "individual");
  const collectiveExhibitions = exhibitions.filter(e => e.type === "colectiva");

  return (
    <div className="flex flex-col">
      <section className="container py-16 md:py-24">
        <div className="mb-16 space-y-4">
          <h1 className="animate-fade-in-left text-4xl font-light tracking-widest md:text-6xl">EXPOSICIONES</h1>
          <div className="h-1 w-24 bg-foreground animate-fade-in-left" style={{ animationDelay: '0.1s' }}></div>
          <p className="max-w-2xl text-lg font-light text-muted-foreground">
            Recorrido por las exposiciones individuales y colectivas que han marcado mi trayectoria artística.
          </p>
        </div>

        <div className="mb-20">
          <h2 className="mb-8 text-2xl font-light tracking-wide">Mapa de Exposiciones</h2>
          <MapClient exhibitions={exhibitions} />
        </div>

        <div className="space-y-16">
          <div>
            <h2 className="mb-8 text-2xl font-light tracking-wide">Exposiciones Individuales</h2>
            <div className="space-y-8">
              {individualExhibitions.map((exhibition) => (
                <div 
                  key={exhibition.id} 
                  className="border-l-2 border-foreground/20 pl-6 py-2 transition-all hover:border-foreground/60"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-wide">{exhibition.title}</h3>
                    <p className="text-sm font-light text-muted-foreground">
                      {exhibition.venue} · {exhibition.city}, {exhibition.country}
                    </p>
                    <p className="text-sm font-light text-muted-foreground">
                      {exhibition.year}
                      {exhibition.startDate && exhibition.endDate && (
                        <> · {new Date(exhibition.startDate).toLocaleDateString('es-AR', { month: 'long', day: 'numeric' })} - {new Date(exhibition.endDate).toLocaleDateString('es-AR', { month: 'long', day: 'numeric' })}</>
                      )}
                    </p>
                    {exhibition.description && (
                      <p className="pt-2 text-sm font-light text-muted-foreground max-w-2xl">
                        {exhibition.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-8 text-2xl font-light tracking-wide">Exposiciones Colectivas</h2>
            <div className="space-y-8">
              {collectiveExhibitions.map((exhibition) => (
                <div 
                  key={exhibition.id} 
                  className="border-l-2 border-foreground/20 pl-6 py-2 transition-all hover:border-foreground/60"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-light tracking-wide">{exhibition.title}</h3>
                    <p className="text-sm font-light text-muted-foreground">
                      {exhibition.venue} · {exhibition.city}, {exhibition.country}
                    </p>
                    <p className="text-sm font-light text-muted-foreground">
                      {exhibition.year}
                      {exhibition.startDate && exhibition.endDate && (
                        <> · {new Date(exhibition.startDate).toLocaleDateString('es-AR', { month: 'long', day: 'numeric' })} - {new Date(exhibition.endDate).toLocaleDateString('es-AR', { month: 'long', day: 'numeric' })}</>
                      )}
                    </p>
                    {exhibition.description && (
                      <p className="pt-2 text-sm font-light text-muted-foreground max-w-2xl">
                        {exhibition.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
