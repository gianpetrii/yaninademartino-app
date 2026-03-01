import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exposiciones - Yanina De Martino",
  description: "Exposiciones individuales y colectivas de Yanina De Martino.",
};

export default function ExposicionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
