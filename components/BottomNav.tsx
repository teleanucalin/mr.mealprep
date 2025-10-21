"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, ListChecks, Calendar, ShoppingCart, User } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Acasă" },
  { href: "/plan", icon: ListChecks, label: "Plan" },
  { href: "/week", icon: Calendar, label: "Săptămână" },
  { href: "/checkout", icon: ShoppingCart, label: "Coș" },
  { href: "/account", icon: User, label: "Cont" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background pb-safe">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

