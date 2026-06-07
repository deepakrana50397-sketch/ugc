import Image, { ImageProps } from "next/image";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  src: any; // Accept imported assets or string paths
  alt: string;
  className?: string;
}

export default function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  ...props
}: OptimizedImageProps) {
  // If the image is an SVG, standard optimization can be skipped to preserve vectors.
  const isSvg = typeof src === "string" && src.endsWith(".svg");

  if (isSvg) {
    return (
      <img
        src={src}
        alt={alt}
        className={twMerge("h-auto w-auto object-contain", className)}
        loading={priority ? "eager" : "lazy"}
        {...(props as any)}
      />
    );
  }

  return (
    <div className={twMerge("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        priority={priority}
        className="h-full w-full object-cover transition-opacity duration-300"
        {...props}
      />
    </div>
  );
}
