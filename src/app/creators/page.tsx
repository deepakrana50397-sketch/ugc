import type { Metadata } from "next";
import CreatorsClient from "./CreatorsClient";
import { creatorsSeo } from "@/views/Creators/seo";

export const metadata: Metadata = {
  title: creatorsSeo.title,
  description: creatorsSeo.description,
  keywords: creatorsSeo.keywords,
};

export default function Page() {
  return <CreatorsClient />;
}
