import type { Metadata } from "next";
import "@fontsource/bricolage-grotesque";
import "@fontsource/manrope";
import "./globals.css";

export const metadata: Metadata = {
  title: "Desa Mendongan | Website Resmi",
  description: "Website resmi Desa Mendongan, Kecamatan Sumowono, Kabupaten Semarang. Menyajikan informasi terkini seputar profil, potensi UMKM, dan layanan desa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased">
        <main className="flex-grow">
          {children}
        </main>
      </body>
    </html>
  );
}
