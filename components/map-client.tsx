"use client";

import { useEffect, useState } from "react";
import { Exhibition } from "@/types";

interface MapClientProps {
  exhibitions: Exhibition[];
}

export function MapClient({ exhibitions }: MapClientProps) {
  const [map, setMap] = useState<any>(null);
  const [L, setL] = useState<any>(null);
  const [MarkerClusterGroup, setMarkerClusterGroup] = useState<any>(null);
  const [selectedExhibition, setSelectedExhibition] = useState<Exhibition | null>(null);
  const [groupedExhibitionsAtLocation, setGroupedExhibitionsAtLocation] = useState<Exhibition[]>([]);
  const [currentIndexInGroup, setCurrentIndexInGroup] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      Promise.all([
        import("leaflet"),
        import("leaflet.markercluster")
      ]).then(([leaflet, markerCluster]) => {
        setL(leaflet.default);
        setMarkerClusterGroup((leaflet.default as any).MarkerClusterGroup);
      });
    }
  }, []);

  useEffect(() => {
    if (!L || !MarkerClusterGroup) return;
    if (map) return;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const clusterLink = document.createElement("link");
    clusterLink.rel = "stylesheet";
    clusterLink.href = "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css";
    document.head.appendChild(clusterLink);

    const clusterDefaultLink = document.createElement("link");
    clusterDefaultLink.rel = "stylesheet";
    clusterDefaultLink.href = "https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css";
    document.head.appendChild(clusterDefaultLink);

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
      .marker-cluster {
        background: #fff !important;
        border: 2px solid #000 !important;
        border-radius: 0 !important;
      }
      .marker-cluster.cluster-proxima {
        border-color: #dc2626 !important;
      }
      .marker-cluster div {
        background: rgba(255,255,255,0.9) !important;
        border-radius: 0 !important;
        font-weight: 300 !important;
        font-size: 12px !important;
        color: #000 !important;
      }
      .marker-cluster.cluster-proxima div {
        color: #dc2626 !important;
        font-weight: 400 !important;
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

    const markers = new MarkerClusterGroup({
      maxClusterRadius: 80,
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
      iconCreateFunction: function(cluster: any) {
        const markers = cluster.getAllChildMarkers();
        const hasProxima = markers.some((m: any) => m.options.exhibition?.status === 'proxima');
        const count = markers.length;
        const color = hasProxima ? '#dc2626' : '#000';
        
        return L.divIcon({
          html: `<div style="width: 32px; height: 32px; background: #fff; border: 2px solid ${color}; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: ${hasProxima ? '500' : '300'}; color: ${color};">${count}</div>`,
          className: `marker-cluster ${hasProxima ? 'cluster-proxima' : ''}`,
          iconSize: [32, 32],
        });
      }
    });

    const groupedByExactLocation = new Map<string, Exhibition[]>();
    
    exhibitions.forEach((exhibition) => {
      if (exhibition.coordinates) {
        const key = `${exhibition.coordinates.lat},${exhibition.coordinates.lng}`;
        if (!groupedByExactLocation.has(key)) {
          groupedByExactLocation.set(key, []);
        }
        groupedByExactLocation.get(key)!.push(exhibition);
      }
    });

    groupedByExactLocation.forEach((group) => {
      const exhibition = group[0];
      const hasProxima = group.some(e => e.status === 'proxima');
      const markerColor = hasProxima ? '#dc2626' : '#000';
      
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="width: 14px; height: 14px; background: ${markerColor}; border: 3px solid #fff; box-shadow: 0 0 0 2px ${markerColor}; transition: transform 0.2s;"></div>`,
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      });
      
      const marker = L.marker(
        [exhibition.coordinates!.lat, exhibition.coordinates!.lng],
        { 
          icon: customIcon,
          title: group.length > 1 ? `${group.length} exposiciones` : exhibition.title,
          exhibition: exhibition
        }
      );
      
      marker.on('click', function(e: any) {
        L.DomEvent.stopPropagation(e);
        setSelectedExhibition(group[0]);
        setGroupedExhibitionsAtLocation(group);
        setCurrentIndexInGroup(0);
      });
      
      marker.getElement()?.addEventListener('click', function(e: Event) {
        e.stopPropagation();
        setSelectedExhibition(group[0]);
        setGroupedExhibitionsAtLocation(group);
        setCurrentIndexInGroup(0);
      });
      
      markers.addLayer(marker);
    });

    mapInstance.addLayer(markers);

    mapInstance.on('click', function() {
      setSelectedExhibition(null);
    });

    setMap(mapInstance);

    return () => {
      mapInstance.remove();
    };
  }, [L, MarkerClusterGroup, exhibitions]);

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
                setGroupedExhibitionsAtLocation([]);
                setCurrentIndexInGroup(0);
              }}
              className="absolute right-2 top-2 text-2xl font-light leading-none transition-transform hover:rotate-90 hover:opacity-60"
            >
              ×
            </button>
            
            {groupedExhibitionsAtLocation.length > 1 && (
              <div className="mb-4 flex items-center justify-between border-b border-foreground/20 pb-3">
                <span className="text-xs font-light uppercase tracking-wider text-muted-foreground">
                  {currentIndexInGroup + 1} de {groupedExhibitionsAtLocation.length} en esta ubicación
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      const newIndex = currentIndexInGroup > 0 ? currentIndexInGroup - 1 : groupedExhibitionsAtLocation.length - 1;
                      setCurrentIndexInGroup(newIndex);
                      setSelectedExhibition(groupedExhibitionsAtLocation[newIndex]);
                    }}
                    className="h-6 w-6 border border-foreground transition-all hover:bg-foreground hover:text-background"
                    aria-label="Anterior"
                  >
                    ←
                  </button>
                  <button
                    onClick={() => {
                      const newIndex = currentIndexInGroup < groupedExhibitionsAtLocation.length - 1 ? currentIndexInGroup + 1 : 0;
                      setCurrentIndexInGroup(newIndex);
                      setSelectedExhibition(groupedExhibitionsAtLocation[newIndex]);
                    }}
                    className="h-6 w-6 border border-foreground transition-all hover:bg-foreground hover:text-background"
                    aria-label="Siguiente"
                  >
                    →
                  </button>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <h3 className="text-lg font-light tracking-wide pr-6 animate-fade-in-left">
                {selectedExhibition.title}
                {selectedExhibition.isRecurring && selectedExhibition.editions && (
                  <span className="block text-xs font-light uppercase tracking-wider text-muted-foreground mt-1">
                    Ediciones: {selectedExhibition.editions.join(', ')}
                  </span>
                )}
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
              {selectedExhibition.eventUrl && (
                <a 
                  href={selectedExhibition.eventUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 pt-2 text-sm font-light uppercase tracking-wider text-red-600 transition-all hover:gap-3 hover:underline animate-fade-in-left"
                  style={{ animationDelay: '0.3s' }}
                  onClick={(e: Event) => e.stopPropagation()}
                >
                  Más información
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
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
