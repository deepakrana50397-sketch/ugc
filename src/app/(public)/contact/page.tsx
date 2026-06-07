import type { Metadata } from "next";
import ContactClient from "@/features/contact/ContactClient";
import { contactSeo } from "@/views/Contact/seo";

export const metadata: Metadata = {
  title: contactSeo.title,
  description: contactSeo.description,
  keywords: contactSeo.keywords,
};

export default function Page() {
  return <ContactClient />;
}
