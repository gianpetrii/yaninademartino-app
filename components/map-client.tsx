"use client";

import { useEffect, useState } from "react";
import { Exhibition } from "@/types";

interface MapClientProps {
  exhibitions: Exhibition[];
}

export function MapClient({ exhibitions }: MapClientProps) {
  const [map, setMap] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet.default);
      });
    }
  }, []);

  useEffect(() => {
    if (!L) return;
    if (map) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const style = document.createElement("style");
    style.textContent = `
      .leaflet-container {
        background: #fafafa !important;
        font-family: inherit;
      }
      .leaflet-tile {
        filter: grayscale(100%) contrast(1.2) brightness(1.1);
      }
      .leaflet-control-zoom {
        border: 1px solid #000 !important;
        border-radius: 0 !important;
      }
      .leaflet-control-zoom a {
        background: #fff !important;
        color: #000 !important;
        border: none !important;
        border-radius: 0 !important;
        font-weight: 300;
      }
      .leaflet-control-zoom a:hover {
        background: #000 !important;
        color: #fff !important;
      }
      .leaflet-control-attribution {
        font-size: 9px;
        font-weight: 300;
        background: rgba(255,255,255,0.8) !important;
      }
      .custom-marker {
        cursor: pointer !important;
      }
      .custom-marker:hover div {
        transform: scale(1.3);
        transition: transform 0.2s;
      }
    `;
    document.head.appendChild(style);

    const mapInstance = L.map("map", {
      zoomControl: true,
      scrollWheelZoom: true,
    }).setView([-34.6037, -58.3816], 4);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap',
      minZoom: 3,
      maxZoom: 10,
    }).addTo(mapInstance);

    exhibitions.forEach((exhibition) => {
      if (exhibition.coordinates) {
        const markerColor = exhibition.status === 'proxima' ? '#dc2626' : '#000';
        
        const customIcon = L.divIcon({
          className: 'custom-marker',
          html: `<div style="width: 14px; height: 14px; background: ${markerColor}; border: 3px solid #fff; box-shadow: 0 0 0 2px ${markerColor}; transition: transform 0.2s;"></div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7],
        });
        
        const marker = L.marker(
          [exhibition.coordinates.lat, exhibition.coordinates.lng],
          { 
            icon: customIcon,
            title: exhibition.title
          }
        ).addTo(mapInstance);
        
        marker.on('click', function(e: any) {
          L.DomEvent.stopPropagation(e);
          setSelectedExhibition(exhibition);
        });
        
        marker.getElement()?.addEventListener('click', function(e: Event) {
          e.stopPropagation();
          setSelectedExhibition(exhibition);
        });
      }
    });

    mapInstance.on('click', function() {
      setSelectedExhibition(null);
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [L, exhibitions]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <div 
          id="map" 
          className="h-[500px] w-full border-2 border-foreground md:h-[600px]"
        />
        
        {selectedExhibition && (
          <div className="absolute bottom-4 left-4 right-4 z-[1000] animate-slide-in-bottom border-2 border-foreground bg-background p-6 shadow-[8px_8px_0_0_rgba(0,0,0,1)] md:left-auto md:right-4 md:w-96">
            <button
              onClick={() => {
                setSelectedExhibition(null);
              }}
              className="absolute right-2 top-2 text-2xl font-light leading-none transition-transform hover:rotate-90 hover:opacity-60"
            >
              ×
            </button>
            <div className="space-y-3">
              <h3 className="text-lg font-light tracking-wide pr-6 animate-fade-in-left">
                {selectedExhibition.title}
              </h3>
              <div className="space-y-1 text-sm font-light text-muted-foreground animate-fade-in-left" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center gap-2">
                  {selectedExhibition.status === 'proxima' && (
                    <span className="inline-block h-2 w-2 bg-red-600"></span>
                  )}
                  <p className="uppercase tracking-wider">{selectedExhibition.venue}</p>
                </div>
                <p>{selectedExhibition.city}, {selectedExhibition.country}</p>
                <p>{selectedExhibition.year}</p>
                <div className="flex gap-2 pt-2">
                  <span className="uppercase tracking-wider">
                    {selectedExhibition.type === 'individual' ? 'Individual' : 'Colectiva'}
                  </span>
                  {selectedExhibition.status === 'proxima' && (
                    <>
                      <span>·</span>
                      <span className="uppercase tracking-wider text-red-600">Próxima</span>
                    </>
                  )}
                </div>
              </div>
              {selectedExhibition.description && (
                <p className="pt-2 text-sm font-light leading-relaxed animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                  {selectedExhibition.description}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-6 text-xs font-light uppercase tracking-wider text-muted-foreground">
        <span>Click en los puntos para ver detalles</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 border-2 border-foreground bg-foreground"></span>
            <span>Pasadas</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 border-2 border-red-600 bg-red-600"></span>
            <span>Próximas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
