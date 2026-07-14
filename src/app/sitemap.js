import { MetadataRoute } from "next";

export const revalidate = 3600;

const SITE_URL ="https://lablens.ir";

const STATIC_ROUTES = [
  { path: "/", priority: 1.0, changeFrequency: "daily" },
  { path: "/sample", priority: 0.8, changeFrequency: "weekly" },
  { path: "/blogs", priority: 0.9, changeFrequency: "weekly" },
];

export default async function sitemap() {
  const routes = STATIC_ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!apiBase) return routes;

    const res = await fetch(`${apiBase}/blog?per_page=50&page=1`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return routes;

    const json = await res.json();
    const posts = Array.isArray(json?.data) ? json.data : [];

    return [
      ...routes,
      ...posts.map((post) => ({
        url: `${SITE_URL}/blogs/${post.slug}`,
        lastModified: post.updated_at ? new Date(post.updated_at) : new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })),
    ];
  } catch {
    return routes;
  }
}
