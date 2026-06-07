import type { Metadata } from "next";
import BrandsClient from "./BrandsClient";
import { brandsSeo } from "@/views/Brands/seo";

export const metadata: Metadata = {
  title: brandsSeo.title,
  description: brandsSeo.description,
  keywords: brandsSeo.keywords,
};

export default function Page() {
  return <BrandsClient />;
}
