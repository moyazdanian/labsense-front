// lib/blog-api.ts

// import type { BlogPostCard, BlogPostFull, PaginatedResponse } from '@/types/blog';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ;

// ─── Fetchers ─────────────────────────────────────────────────────────────────

export async function getFeaturedPosts(limit = 6){
  const res = await fetch(`${API_BASE}/blog/featured?limit=${limit}`, {
    next: { revalidate: 900 }, // ISR: revalidate every 15 min
  });
  if (!res.ok) throw new Error('Failed to fetch featured posts');
  const json = await res.json();
  
  return json.data ;
}

export async function getBlogPosts(
  page = 1,
  perPage = 9,
  category,
  tag,
){
  const params = new URLSearchParams({
    page:     String(page),
    per_page: String(perPage),
    ...(category && { category }),
    ...(tag && { tag }),
  });
  const res = await fetch(`${API_BASE}/blog?${params}`, {
    next: { revalidate: 600 },
  });
  if (!res.ok) throw new Error('Failed to fetch blog posts');
  return res.json() ;
}

export async function getBlogPost(slug){
  const res = await fetch(`${API_BASE}/blog/${slug}`, {
    next: { revalidate: 1800 }, // 30 min
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch blog post');
  const json = await res.json();
  
  return json ;
}

export async function getBlogCategories() {
  const res = await fetch(`${API_BASE}/blog/categories`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data;
}
