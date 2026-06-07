import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline" | "ghost" | "glass" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "solid",
      size = "md",
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            // Base styles
            "inline-flex items-center justify-center rounded-full font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer disabled:pointer-events-none disabled:opacity-50",
            // Variant styles
            {
              "bg-brand-terracotta text-white hover:bg-[#0f172a] shadow-sm":
                variant === "solid",
              "border border-brand-border text-brand-text hover:bg-[#0f172a] hover:text-white":
                variant === "outline",
              "text-brand-text hover:bg-brand-bg/60": variant === "ghost",
              "bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-md":
                variant === "glass",
              "bg-brand-gold text-white hover:opacity-90 shadow-sm":
                variant === "gold",
            },
            // Size styles
            {
              "px-4 py-2 text-[10px]": size === "sm",
              "px-6 py-3.5": size === "md",
              "px-8 py-4.5 text-sm": size === "lg",
            }
          ),
          className
        )}
        {...props}
      >
        {isLoading ? (
          <span className="mr-2 inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
