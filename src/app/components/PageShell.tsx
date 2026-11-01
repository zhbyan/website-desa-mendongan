"use client";

import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[--color-background] text-[--color-on-surface] antialiased min-h-screen relative flex flex-col">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" precedence="default" />
      <Navbar />

      <main className="w-full flex-1 pt-[68px]">
        {children}
      </main>

      <Footer />
    </div>
  );
}
