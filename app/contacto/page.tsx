"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Mensaje enviado", {
      description: "Gracias por contactarte. Responderé a la brevedad.",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setLoading(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex flex-col">
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 space-y-4">
            <h1 className="animate-fade-in-left text-4xl font-light tracking-widest md:text-6xl">CONTACTO</h1>
            <div className="h-1 w-24 bg-foreground animate-fade-in-left" style={{ animationDelay: '0.1s' }}></div>
            <p className="max-w-2xl text-lg font-light text-muted-foreground">
              Para consultas sobre obra, exposiciones o colaboraciones.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-8 animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <h3 className="text-lg font-light tracking-wide">Email</h3>
                </div>
                <p className="font-light text-muted-foreground">
                  info@yarinademartino.com
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-light tracking-wide">Ubicación</h3>
                <p className="font-light text-muted-foreground">
                  Buenos Aires, Argentina
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-light tracking-wide">Representación</h3>
                <p className="font-light text-muted-foreground">
                  Disponible para consultas sobre representación en galerías y espacios de arte.
                </p>
              </div>
            </div>

            <div className="border border-foreground/20 p-8 animate-fade-in-right transition-all hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)]" style={{ animationDelay: '0.3s' }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-light uppercase tracking-wider text-xs">
                    Nombre
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Tu nombre"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="border-foreground/20 font-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-light uppercase tracking-wider text-xs">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="border-foreground/20 font-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="font-light uppercase tracking-wider text-xs">
                    Asunto
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Motivo de consulta"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-foreground/20 font-light"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-light uppercase tracking-wider text-xs">
                    Mensaje
                  </Label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Tu mensaje..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="flex w-full border border-foreground/20 bg-background px-3 py-2 text-sm font-light ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full gap-2 font-light uppercase tracking-wider" 
                  disabled={loading}
                >
                  {loading ? "Enviando..." : (
                    <>
                      Enviar
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
