import type { Metadata } from "next";
import GigsClient from "./GigsClient";
import { gigsSeo } from "@/views/Gigs/seo";

export const metadata: Metadata = {
  title: gigsSeo.title,
  description: gigsSeo.description,
  keywords: gigsSeo.keywords,
};

export default function Page() {
  return <GigsClient />;
}
