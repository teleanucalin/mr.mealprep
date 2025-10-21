"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ProgressBarProps {
  value?: number; // 0-100
  indeterminate?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({ 
  value = 0, 
  indeterminate = false, 
  className,
  size = "md"
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!indeterminate && value !== progress) {
      const timer = setTimeout(() => setProgress(value), 100);
      return () => clearTimeout(timer);
    }
  }, [value, indeterminate, progress]);

  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  };

  return (
    <div
      className={cn(
        "w-full bg-secondary rounded-full overflow-hidden relative",
        sizeClasses[size],
        className
      )}
    >
      {indeterminate ? (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/50 via-primary to-primary/50 animate-progress-indeterminate" />
      ) : (
        <div
          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out rounded-full shadow-sm"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      )}
    </div>
  );
}

