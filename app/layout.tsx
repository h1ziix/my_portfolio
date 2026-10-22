import type { Metadata } from "next";
import { Golos_Text, Sofia_Sans_Condensed, JetBrains_Mono } from "next/font/google";
import { siteUrl } from "@/lib/site";
import { StarField } from "@/components/ui/star-field";
import "./globals.css";

// Both families ship Cyrillic with Kazakh letters, so a Russian version needs no font change.
const golosText = Golos_Text({
  subsets: ["latin"],
  variable: "--font-text",
  display: "swap"
});

const sofiaSansCondensed = Sofia_Sans_Condensed({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-display",
  display: "swap"
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap"
});

const socialImageUrl = new URL("/opengraph-image", siteUrl).href;
const siteTitle = "Toksoz Sultan — Full-stack developer | TypeScript, Python & AI";
const siteDescription =
  "Full-stack developer in Almaty working with TypeScript, JavaScript, Python and PostgreSQL. Explore Agentic Ops, ATU Campus and business automation through product videos and engineering case studies.";

// Resolve the saved or system preference before the page paints.
const themeBootstrap = `(function(){var p='system';try{var s=localStorage.getItem('toksoz-theme');if(s==='light'||s==='dark')p=s;}catch(e){}var t=p==='system'?(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):p;var r=document.documentElement;r.dataset.theme=t;r.dataset.themePreference=p;r.style.colorScheme=t;})();`;

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
    siteName: "Toksoz Sultan",
    type: "website",
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: "Toksoz Sultan — Products, agents and automation. TypeScript, JavaScript, Python and PostgreSQL."
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
    <html lang="en" className={`${golosText.variable} ${sofiaSansCondensed.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head><script id="theme-bootstrap" dangerouslySetInnerHTML={{ __html: themeBootstrap }} /></head>
      <body className="font-sans antialiased"><StarField />{children}</body>
    </html>
  );
}
