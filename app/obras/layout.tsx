import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Obras - Yarina De Martino",
  description: "Galería de obras de Yarina De Martino, artista visual contemporánea.",
};

export default function ObrasLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
