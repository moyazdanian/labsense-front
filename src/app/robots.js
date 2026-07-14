import { MetadataRoute } from "next";

export default function robots() {
  const siteUrl ="https://lablens.ir";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
