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

const siteUrl = new URL("https://my-portfolio-five-swart-53.vercel.app/");
const socialImageUrl = new URL("/technical-system-texture.png", siteUrl).href;
const siteTitle = "Toksoz Sultan - AI Product Developer";
const siteDescription =
  "Toksoz Sultan — AI Product Developer building full-stack AI products, agentic workflows and business automation with human approvals and controlled actions.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: siteTitle,
    template: "%s | Toksoz Sultan"
  },
  description: siteDescription,
  alternates: {
    canonical: siteUrl.href
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl.href,
    siteName: "Toksoz Sultan Portfolio",
    type: "website",
    images: [
      {
        url: socialImageUrl,
        width: 1792,
        height: 1024,
        alt: "Abstract technical system texture"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [socialImageUrl]
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
