import type { Metadata } from "next";
import CaseStudiesClient from "@/features/case-studies/CaseStudiesClient";
import { caseStudiesSeo } from "@/views/CaseStudies/seo";

export const metadata: Metadata = {
  title: caseStudiesSeo.title,
  description: caseStudiesSeo.description,
  keywords: caseStudiesSeo.keywords,
};

export default function Page() {
  return <CaseStudiesClient />;
}
