import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obras - Yanina De Martino",
  description: "Galería de obras de Yanina De Martino, artista visual contemporánea.",
};

export default function ObrasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
