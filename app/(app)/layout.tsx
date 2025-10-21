import Link from "next/link";
import type { ReactNode } from "react";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-base text-text-default">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border-subtle bg-white/95 px-5 py-4 backdrop-blur">
        <Link href="/plan" className="text-lg font-semibold text-[#059669]">
          Mr. Mealprep
        </Link>
        <Link href="/checkout" className="text-sm font-semibold text-[#059669]">
          Vezi coșul
        </Link>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-6">
        {children}
      </main>
    </div>
  );
}
