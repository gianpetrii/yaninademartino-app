import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exposiciones - Yarina De Martino",
  description: "Exposiciones individuales y colectivas de Yarina De Martino.",
};

export default function ExposicionesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
