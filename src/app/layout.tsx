// @ts-ignore: Cannot find module or type declarations for side-effect import of './globals.css'.
import "./globals.css";
import {
  Cormorant_Garamond,
  Great_Vibes,
  Inter,
} from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Ece & Burak Wedding",
  description: "23 Haziran 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`
          ${cormorant.variable}
          ${greatVibes.variable}
          ${inter.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}