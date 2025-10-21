import Link from "next/link";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-base text-text-default">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-subtle bg-white/90 px-5 py-4 backdrop-blur">
        <Link href="/" className="text-lg font-semibold text-[#059669]">
          Mr. Mealprep
        </Link>
        <nav className="flex items-center gap-4 text-sm text-[#475569]">
          <a href="#cum-functioneaza">Cum funcționează</a>
          <a href="#planuri">Planuri</a>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
