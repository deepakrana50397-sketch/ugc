import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 flex items-center space-x-2 text-[11px] font-bold uppercase tracking-widest text-brand-muted/80">
      <Link
        href="/"
        className="flex items-center space-x-1 hover:text-brand-terracotta transition-colors duration-200"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-3 h-3 text-brand-border" />
            {isLast || !item.path ? (
              <span className="text-brand-text/90 font-black" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.path}
                className="hover:text-brand-terracotta transition-colors duration-200"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
