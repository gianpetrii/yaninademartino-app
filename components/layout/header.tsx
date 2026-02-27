"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/95 backdrop-blur-sm transition-all">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center transition-opacity hover:opacity-60">
          <span className="text-2xl font-light tracking-wider">YARINA DE MARTINO</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          <Link
            href="/obras"
            className="text-sm font-light tracking-wide uppercase transition-all hover:text-foreground/60 hover:translate-y-[-2px]"
          >
            Obras
          </Link>
          <Link
            href="/exposiciones"
            className="text-sm font-light tracking-wide uppercase transition-all hover:text-foreground/60 hover:translate-y-[-2px]"
          >
            Exposiciones
          </Link>
          <Link
            href="/premios"
            className="text-sm font-light tracking-wide uppercase transition-all hover:text-foreground/60 hover:translate-y-[-2px]"
          >
            Premios
          </Link>
          <Link
            href="/talleres"
            className="text-sm font-light tracking-wide uppercase transition-all hover:text-foreground/60 hover:translate-y-[-2px]"
          >
            Talleres
          </Link>
          <Link
            href="/prensa"
            className="text-sm font-light tracking-wide uppercase transition-all hover:text-foreground/60 hover:translate-y-[-2px]"
          >
            Prensa
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-light tracking-wide uppercase transition-all hover:text-foreground/60 hover:translate-y-[-2px]"
          >
            Contacto
          </Link>
        </nav>

        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden transition-transform hover:rotate-90"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 transition-transform" />
          ) : (
            <Menu className="h-6 w-6 transition-transform" />
          )}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-foreground/10 animate-slide-in-bottom">
          <nav className="container flex flex-col gap-6 py-8">
            <Link
              href="/obras"
              className="text-base font-light tracking-wide uppercase transition-colors hover:text-foreground/60"
              onClick={() => setMobileMenuOpen(false)}
            >
              Obras
            </Link>
            <Link
              href="/exposiciones"
              className="text-base font-light tracking-wide uppercase transition-colors hover:text-foreground/60"
              onClick={() => setMobileMenuOpen(false)}
            >
              Exposiciones
            </Link>
            <Link
              href="/premios"
              className="text-base font-light tracking-wide uppercase transition-colors hover:text-foreground/60"
              onClick={() => setMobileMenuOpen(false)}
            >
              Premios
            </Link>
            <Link
              href="/talleres"
              className="text-base font-light tracking-wide uppercase transition-colors hover:text-foreground/60"
              onClick={() => setMobileMenuOpen(false)}
            >
              Talleres
            </Link>
            <Link
              href="/prensa"
              className="text-base font-light tracking-wide uppercase transition-colors hover:text-foreground/60"
              onClick={() => setMobileMenuOpen(false)}
            >
              Prensa
            </Link>
            <Link
              href="/contacto"
              className="text-base font-light tracking-wide uppercase transition-colors hover:text-foreground/60"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contacto
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

