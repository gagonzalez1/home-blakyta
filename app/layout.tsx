import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://home.blakyta3d.duckdns.org"),
  title: "Proyectos | Blakyta 3D",
  description: "Acceso central a las aplicaciones y herramientas de Blakyta 3D.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Proyectos | Blakyta 3D",
    description: "Todas las aplicaciones y proyectos de Blakyta 3D en un solo lugar.",
    type: "website",
    images: [{ url: "/og.png", width: 1731, height: 909, alt: "Blakyta 3D — Todo en un solo lugar." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos | Blakyta 3D",
    description: "Todas las aplicaciones y proyectos de Blakyta 3D en un solo lugar.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
