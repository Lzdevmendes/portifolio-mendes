import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Luiz Mendes — Desenvolvedor Fullstack JR / Pleno",
  description:
    "Desenvolvedor Fullstack JR / Pleno especializado em arquiteturas escaláveis com .NET, Go, Node.js e Flutter. Mais de R$ 1,0 milhão processados em soluções de pagamento.",
  keywords: [
    "Full Stack Developer",
    "Desenvolvedor Fullstack",
    "Junior",
    "Pleno",
    "Next.js",
    ".NET",
    "Go",
    "Node.js",
    "Flutter",
    "React",
    "Luiz Mendes",
    "Lzmen",
  ],
  authors: [{ name: "Luiz Felipe Barreto Mendes" }],
  openGraph: {
    title: "Luiz Mendes — Desenvolvedor Fullstack JR / Pleno",
    description:
      "Desenvolvedor Fullstack JR / Pleno especializado em arquiteturas escaláveis com .NET, Go, Node.js e Flutter. Mais de R$ 1,0 milhão processados em soluções de pagamento.",
    type: "website",
    locale: "pt_BR",
    siteName: "Luiz Mendes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luiz Mendes — Desenvolvedor Fullstack JR / Pleno",
    description:
      "Desenvolvedor Full Stack especializado em arquiteturas escaláveis com .NET, Go, Node.js e Flutter.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  );
}
