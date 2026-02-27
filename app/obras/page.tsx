import { Metadata } from "next";
import Image from "next/image";
import { Artwork } from "@/types";

export const metadata: Metadata = {
  title: "Obras - Yarina De Martino",
  description: "Galería de obras de Yarina De Martino, artista visual contemporánea.",
};

const artworks: Artwork[] = [
  {
    id: "1",
    title: "Estructura I",
    year: 2023,
    technique: "Acrílico sobre tela",
    dimensions: "120 x 100 cm",
    imageUrl: "/images/obras/placeholder-1.jpg",
    description: "Exploración de formas geométricas y espacios negativos.",
    category: "Pintura",
  },
  {
    id: "2",
    title: "Fragmento",
    year: 2023,
    technique: "Técnica mixta",
    dimensions: "80 x 80 cm",
    imageUrl: "/images/obras/placeholder-2.jpg",
    description: "Composición minimalista con texturas brutalistas.",
    category: "Pintura",
  },
  {
    id: "3",
    title: "Vacío Construido",
    year: 2022,
    technique: "Acrílico sobre tela",
    dimensions: "150 x 120 cm",
    imageUrl: "/images/obras/placeholder-3.jpg",
    description: "Diálogo entre el espacio y la materia.",
    category: "Pintura",
  },
  {
    id: "4",
    title: "Serie Hormigón",
    year: 2022,
    technique: "Óleo sobre tela",
    dimensions: "100 x 100 cm",
    imageUrl: "/images/obras/placeholder-4.jpg",
    description: "Inspirada en arquitectura brutalista urbana.",
    category: "Pintura",
  },
  {
    id: "5",
    title: "Plano Suspendido",
    year: 2021,
    technique: "Acrílico sobre tela",
    dimensions: "90 x 120 cm",
    imageUrl: "/images/obras/placeholder-5.jpg",
    description: "Estudio de equilibrio y tensión visual.",
    category: "Pintura",
  },
  {
    id: "6",
    title: "Intersección",
    year: 2021,
    technique: "Técnica mixta",
    dimensions: "110 x 90 cm",
    imageUrl: "/images/obras/placeholder-6.jpg",
    description: "Encuentro de líneas y planos en el espacio.",
    category: "Pintura",
  },
];

export default function ObrasPage() {
  return (
    <div className="flex flex-col">
      <section className="container py-16 md:py-24">
        <div className="mb-16 space-y-4">
          <h1 className="text-4xl font-light tracking-widest md:text-6xl">OBRAS</h1>
          <div className="h-1 w-24 bg-foreground"></div>
          <p className="max-w-2xl text-lg font-light text-muted-foreground">
            Una selección de trabajos que exploran la intersección entre el brutalismo arquitectónico 
            y la expresión pictórica contemporánea.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork, index) => (
            <div 
              key={artwork.id} 
              className="artwork-item group space-y-4"
              style={{ 
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <div className="relative aspect-[4/5] overflow-hidden border-2 border-foreground bg-muted transition-all duration-300 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:-translate-y-1">
                <div className="absolute inset-0 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                  <span className="text-sm font-light text-muted-foreground">
                    [Imagen de obra]
                  </span>
                </div>
                <div className="absolute inset-0 bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-light tracking-wide transition-all group-hover:translate-x-2">
                  {artwork.title}
                </h3>
                <p className="text-sm font-light text-muted-foreground">
                  {artwork.year} · {artwork.technique}
                </p>
                <p className="text-sm font-light text-muted-foreground">
                  {artwork.dimensions}
                </p>
                {artwork.description && (
                  <p className="pt-2 text-sm font-light leading-relaxed text-muted-foreground">
                    {artwork.description}
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
