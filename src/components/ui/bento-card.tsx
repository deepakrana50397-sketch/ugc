import { HTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: "scale" | "lift" | "tilt" | "none";
  glass?: boolean;
}

const BentoCard = forwardRef<HTMLDivElement, BentoCardProps>(
  (
    { className, hoverEffect = "lift", glass = false, children, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={twMerge(
          clsx(
            // Base styles
            "relative overflow-hidden rounded-[24px] border p-6 md:p-8 transition-all duration-300",
            {
              // Glassmorphism variants
              "bg-white/5 border-white/10 backdrop-blur-md text-white": glass,
              "bg-brand-card border-brand-border text-brand-text shadow-sm":
                !glass,
            },
            // Hover styles
            {
              "hover:scale-[1.02]": hoverEffect === "scale",
              "hover:-translate-y-1 hover:border-brand-terracotta/40 hover:shadow-md":
                hoverEffect === "lift" && !glass,
              "hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-white/[0.02]":
                hoverEffect === "lift" && glass,
              "hover:border-brand-terracotta": hoverEffect === "tilt", // standard tilt indicator
            }
          ),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

BentoCard.displayName = "BentoCard";

export default BentoCard;
