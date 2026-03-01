"use client";

import { Exhibition } from "@/types";
import { MapClient } from "@/components/map-client";

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-');
  const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  return `${parseInt(day)} de ${monthNames[parseInt(month) - 1]}`;
}

const exhibitions: Exhibition[] = [
  {
    id: "1",
    title: "Nuevas Geometrías",
    type: "individual",
    status: "proxima",
    venue: "Galería Arte Contemporáneo",
    city: "Buenos Aires",
    country: "Argentina",
    year: 2026,
    startDate: "2026-08-15",
    endDate: "2026-09-30",
    description: "Próxima exposición individual con obras recientes que profundizan en la exploración del espacio y la forma.",
    coordinates: { lat: -34.6037, lng: -58.3816 },
    eventUrl: "https://galeriaarte.com.ar/nuevas-geometrias",
  },
  {
    id: "2",
    title: "Bienal de Arte Latinoamericano",
    type: "colectiva",
    status: "proxima",
    venue: "Museo Nacional de Bellas Artes",
    city: "Santiago",
    country: "Chile",
    year: 2026,
    startDate: "2026-06-15",
    endDate: "2026-08-30",
    description: "Participación en la próxima edición de la Bienal con obras de la serie Hormigón.",
    coordinates: { lat: -33.4372, lng: -70.6506 },
    isRecurring: true,
    editions: [2022, 2026],
    eventUrl: "https://bienallatinoamericana.cl/2026",
  },
  {
    id: "3",
    title: "Estructuras del Silencio",
    type: "individual",
    status: "pasada",
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
    id: "4",
    title: "Colectiva de Arte Contemporáneo",
    type: "colectiva",
    status: "pasada",
    venue: "Museo de Arte Moderno",
    city: "Córdoba",
    country: "Argentina",
    year: 2023,
    startDate: "2023-05-10",
    endDate: "2023-07-20",
    coordinates: { lat: -31.4201, lng: -64.1888 },
  },
  {
    id: "5",
    title: "Hormigón y Pigmento",
    type: "individual",
    status: "pasada",
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
    id: "6",
    title: "Formas Esenciales",
    type: "individual",
    status: "pasada",
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
    id: "7",
    title: "Nuevas Voces del Arte Argentino",
    type: "colectiva",
    status: "pasada",
    venue: "Fundación OSDE",
    city: "Buenos Aires",
    country: "Argentina",
    year: 2021,
    coordinates: { lat: -34.5956, lng: -58.3772 },
  },
];

export default function ExposicionesPage() {
  const upcomingExhibitions = exhibitions.filter(e => e.status === "proxima");
  const pastExhibitions = exhibitions.filter(e => e.status === "pasada");

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
          {upcomingExhibitions.length > 0 && (
            <div>
              <h2 className="mb-8 text-2xl font-light tracking-wide flex items-center gap-3">
                <span className="inline-block h-3 w-3 bg-red-600"></span>
                Próximas Exposiciones
              </h2>
              <div className="space-y-8">
                {upcomingExhibitions.map((exhibition) => (
                  <div 
                    key={exhibition.id} 
                    className="border-l-2 border-red-600/40 pl-6 py-2 transition-all hover:border-red-600"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-light tracking-wide">{exhibition.title}</h3>
                        {exhibition.isRecurring && exhibition.editions && (
                          <span className="text-xs font-light uppercase tracking-wider text-muted-foreground">
                            (Ediciones: {exhibition.editions.join(', ')})
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-light text-muted-foreground">
                        {exhibition.venue} · {exhibition.city}, {exhibition.country}
                      </p>
                      <p className="text-sm font-light uppercase tracking-wider">
                        {exhibition.type === 'individual' ? 'Individual' : 'Colectiva'}
                      </p>
                      <p className="text-sm font-light text-muted-foreground">
                        {exhibition.year}
                        {exhibition.startDate && exhibition.endDate && (
                          <> · {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}</>
                        )}
                      </p>
                      {exhibition.description && (
                        <p className="pt-2 text-sm font-light text-muted-foreground max-w-2xl">
                          {exhibition.description}
                        </p>
                      )}
                      {exhibition.eventUrl && (
                        <a 
                          href={exhibition.eventUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 pt-2 text-sm font-light uppercase tracking-wider text-red-600 transition-all hover:gap-3 hover:underline"
                        >
                          Más información
                          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="mb-8 text-2xl font-light tracking-wide">Exposiciones Pasadas</h2>
            <div className="space-y-8">
              {pastExhibitions.map((exhibition) => (
                <div 
                  key={exhibition.id} 
                  className="border-l-2 border-foreground/20 pl-6 py-2 transition-all hover:border-foreground/60"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-light tracking-wide">{exhibition.title}</h3>
                      {exhibition.isRecurring && exhibition.editions && (
                        <span className="text-xs font-light uppercase tracking-wider text-muted-foreground">
                          (Ediciones: {exhibition.editions.join(', ')})
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-light text-muted-foreground">
                      {exhibition.venue} · {exhibition.city}, {exhibition.country}
                    </p>
                    <p className="text-sm font-light uppercase tracking-wider">
                      {exhibition.type === 'individual' ? 'Individual' : 'Colectiva'}
                    </p>
                    <p className="text-sm font-light text-muted-foreground">
                      {exhibition.year}
                      {exhibition.startDate && exhibition.endDate && (
                        <> · {formatDate(exhibition.startDate)} - {formatDate(exhibition.endDate)}</>
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
