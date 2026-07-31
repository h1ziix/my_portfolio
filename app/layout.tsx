import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap"
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sultan-portfolio.local"),
  title: {
    default: "Toksoz Sultan - Fullstack Developer",
    template: "%s | Toksoz Sultan"
  },
  description:
    "Portfolio of Toksoz Sultan, a fullstack developer building web products, internal systems, document automation and AI integrations.",
  openGraph: {
    title: "Toksoz Sultan - Fullstack Developer",
    description:
      "Production web products, internal systems, document automation and practical AI integrations.",
    type: "website",
    images: [
      {
        url: "/technical-system-texture.png",
        width: 1792,
        height: 1024,
        alt: "Abstract technical system texture"
      }
    ]
  },
  icons: {
    icon: "/favicon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
