import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Paróquia São Pio X - Campinas/SP",
  description: "Portal oficial da Paróquia São Pio X em Campinas. Horários de missa, notícias, eventos e serviços online.",
  keywords: ["Igreja Católica", "Campinas", "São Pio X", "Missa", "Paróquia"],
  icons: {
    icon: [
      { url: "/favicon-32x32.png?v=4", sizes: "32x32", type: "image/png" },
      { url: "/icon.png?v=4", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-32x32.png?v=4",
    apple: "/apple-touch-icon.png?v=4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
