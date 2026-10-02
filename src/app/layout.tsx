import type { Metadata } from "next";
import { Great_Vibes, Caveat, Cormorant_Garamond, Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-calligraphy",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-handwriting-alt",
});

const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Happy Birthday, My Love | A Handmade Letter",
  description: "A physical handmade love letter and scrapbook created with all my heart.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${greatVibes.variable} ${caveat.variable} ${dancingScript.variable} ${cormorant.variable} ${jakarta.variable} font-sans antialiased bg-[#FAF7F2] text-[#3D2817] selection:bg-[#F2D6D3] selection:text-[#7A1C24] overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
