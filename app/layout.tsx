import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Proyectos | Blakyta 3D",
  description: "Acceso central a las aplicaciones y herramientas de Blakyta 3D.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
