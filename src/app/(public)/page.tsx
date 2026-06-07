import type { Metadata } from "next";
import HomeClient from "@/features/home/HomeClient";
import { homeSeo } from "@/views/Home/seo";

export const metadata: Metadata = {
  title: homeSeo.title,
  description: homeSeo.description,
  keywords: homeSeo.keywords,
};

export default function Page() {
  return <HomeClient />;
}
