import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-foreground/10 bg-background">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-2">
            <h3 className="text-lg font-light tracking-wider">YARINA DE MARTINO</h3>
            <p className="text-sm font-light text-muted-foreground">
              Artista Visual
            </p>
          </div>

          <nav className="flex flex-wrap gap-6">
            <Link
              href="/obras"
              className="text-sm font-light tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Obras
            </Link>
            <Link
              href="/exposiciones"
              className="text-sm font-light tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Exposiciones
            </Link>
            <Link
              href="/premios"
              className="text-sm font-light tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Premios
            </Link>
            <Link
              href="/talleres"
              className="text-sm font-light tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Talleres
            </Link>
            <Link
              href="/prensa"
              className="text-sm font-light tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Prensa
            </Link>
            <Link
              href="/contacto"
              className="text-sm font-light tracking-wide uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Contacto
            </Link>
          </nav>
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/10 text-center text-sm font-light text-muted-foreground">
          <p>&copy; {currentYear} Yarina De Martino. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

