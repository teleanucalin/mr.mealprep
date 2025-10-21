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
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-background/95 backdrop-blur-lg pb-safe shadow-lg">
      <div className="grid grid-cols-5 h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-all duration-200 relative group",
                isActive
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-primary hover:scale-105"
              )}
            >
              {/* Active indicator bar */}
              <div
                className={cn(
                  "absolute top-0 left-1/2 -translate-x-1/2 h-1 bg-primary rounded-b-full transition-all duration-300",
                  isActive ? "w-12 opacity-100" : "w-0 opacity-0 group-hover:w-8 group-hover:opacity-50"
                )}
              />
              
              {/* Icon with animation */}
              <div className={cn(
                "transition-transform duration-200",
                isActive && "scale-110"
              )}>
                <Icon className="h-5 w-5" />
              </div>
              
              <span className="transition-all duration-200">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

