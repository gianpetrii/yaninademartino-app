import { Metadata } from "next";
import { PressItem } from "@/types";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Prensa - Yarina De Martino",
  description: "Apariciones en medios y cobertura de prensa de Yarina De Martino.",
};

const pressItems: PressItem[] = [
  {
    id: "1",
    title: "El minimalismo brutalista de una nueva generación",
    publication: "Revista Ñ - Clarín",
    date: "2023-09-15",
    excerpt: "Yarina De Martino se consolida como una de las voces más interesantes del arte contemporáneo argentino, con una propuesta que fusiona la austeridad del brutalismo arquitectónico con la sensibilidad pictórica.",
    url: "#",
  },
  {
    id: "2",
    title: "Estructuras del Silencio: cuando el vacío habla",
    publication: "La Nación",
    date: "2023-08-20",
    excerpt: "La nueva exposición individual de De Martino en la Galería Arte Contemporáneo propone un diálogo profundo entre el espacio construido y el espacio vacío.",
    url: "#",
  },
  {
    id: "3",
    title: "Artistas argentinos que están redefiniendo el arte contemporáneo",
    publication: "Rolling Stone Argentina",
    date: "2023-03-10",
    excerpt: "Incluida en la lista de 10 artistas emergentes que están transformando el panorama del arte visual en Argentina.",
    url: "#",
  },
  {
    id: "4",
    title: "La arquitectura como inspiración pictórica",
    publication: "Revista Otra Parte",
    date: "2022-12-05",
    excerpt: "Entrevista en profundidad sobre el proceso creativo y la relación entre arquitectura brutalista y pintura.",
    url: "#",
  },
  {
    id: "5",
    title: "Premio Nacional: el reconocimiento a una trayectoria ascendente",
    publication: "Página/12 - Cultura",
    date: "2023-10-22",
    excerpt: "El Fondo Nacional de las Artes distingue a Yarina De Martino por su aporte al arte contemporáneo argentino.",
    url: "#",
  },
  {
    id: "6",
    title: "Jóvenes artistas que hay que seguir",
    publication: "Revista MALBA",
    date: "2021-11-18",
    excerpt: "Perfil de artistas emergentes que están marcando tendencia en el arte visual argentino.",
    url: "#",
  },
];

export default function PrensaPage() {
  return (
    <div className="flex flex-col">
      <section className="container py-16 md:py-24">
        <div className="mb-16 space-y-4">
          <h1 className="animate-fade-in-left text-4xl font-light tracking-widest md:text-6xl">PRENSA</h1>
          <div className="h-1 w-24 bg-foreground animate-fade-in-left" style={{ animationDelay: '0.1s' }}></div>
          <p className="max-w-2xl text-lg font-light text-muted-foreground">
            Cobertura en medios especializados y publicaciones culturales.
          </p>
        </div>

        <div className="space-y-12">
          {pressItems.map((item, index) => (
            <article 
              key={item.id} 
              className="press-item group grid gap-6 border-b-2 border-foreground/10 pb-12 last:border-0 md:grid-cols-[200px_1fr]"
              style={{ 
                animationDelay: `${index * 0.1}s` 
              }}
            >
              <div className="relative aspect-[4/3] overflow-hidden border-2 border-foreground bg-muted transition-all duration-300 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:-translate-y-1">
                <div className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
                  <span className="text-xs font-light text-muted-foreground">[Imagen]</span>
                </div>
                <div className="absolute inset-0 bg-foreground opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>
              </div>
              
              <div className="space-y-3">
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-light tracking-wide transition-all group-hover:translate-x-2">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 text-sm font-light text-muted-foreground">
                    <span className="uppercase tracking-wider">{item.publication}</span>
                    <span>·</span>
                    <time dateTime={item.date}>
                      {new Date(item.date).toLocaleDateString('es-AR', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                </div>
                
                {item.excerpt && (
                  <p className="text-sm font-light leading-relaxed text-muted-foreground">
                    {item.excerpt}
                  </p>
                )}
                
                {item.url && (
                  <a 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-b-2 border-foreground pb-1 text-sm font-light uppercase tracking-wider transition-all hover:gap-3"
                  >
                    Leer artículo
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
