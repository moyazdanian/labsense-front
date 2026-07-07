// app/blog/[slug]/page.tsx  (Next.js 14 App Router)

import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getBlogPost, getFeaturedPosts } from "@/lib/blog-api";
import BlogCard from "../BlogCard";

// ─── generateStaticParams (optional ISR) ─────────────────────────────────────

export async function generateStaticParams() {
  const posts = await getFeaturedPosts(20).catch(() => []);
  return posts.map((p) => ({ slug: p.slug }));
}

// ─── generateMetadata ─────────────────────────────────────────────────────────

export async function generateMetadata({ params }) {
  const slug = await params.slug;
  const data = await getBlogPost(slug).catch(() => null);
  const post = data.data;

  if (!post) return { title: "مقاله یافت نشد" };

  const { seo } = data;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords ?? undefined,
    alternates: { canonical: seo.canonical },
    openGraph: {
      type: "article",
      title: seo.og_title,
      description: seo.og_description,
      url: seo.canonical,
      images: seo.og_image ? [{ url: seo.og_image }] : undefined,
      publishedTime: seo.published_time ?? undefined,
      modifiedTime: seo.modified_time,
      authors: seo.author ? [seo.author] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.og_title,
      description: seo.og_description,
      images: seo.og_image ? [seo.og_image] : undefined,
    },
  };
}

// ─── Page Component ───────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }) {
  const slug = await params.slug;
  const data = await getBlogPost(slug).catch(() => null);
  const post = data.data;

  if (!post) notFound();

  const related = await getFeaturedPosts(3)
    .then((posts) => posts.filter((p) => p.slug !== post.slug).slice(0, 3))
    .catch(() => []);

  const date = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.published_at));

  // CTA values — fallback to sensible defaults
  const ctaTitle = post.cta_title ?? "آماده‌اید وارد عمل شوید؟";
  const ctaDesc =
    post.cta_description ??
    "همین حالا رایگان ثبت‌نام کنید و از تمام امکانات پلتفرم بهره‌مند شوید.";
  const ctaBtn = post.cta_button_text ?? "شروع رایگان";
  const ctaUrl = post.cta_button_url ?? "/";

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: data.seo.title,
    description: data.seo.description,
    image: data.seo.og_image,
    url: data.seo.canonical,
    datePublished: data.seo.published_time,
    dateModified: data.seo.modified_time,
    author: post.author
      ? { "@type": "Person", name: post.author.name }
      : undefined,
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-white" dir="rtl">
        {/* ── Hero ───────────────────────────────────────────────────── */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12">
            {/* Breadcrumb */}
            <nav
              aria-label="breadcrumb"
              className="text-sm text-gray-400 mb-6 flex items-center gap-2"
            >
              <Link
                href="/"
                className="hover:text-indigo-600 transition-colors"
              >
                خانه
              </Link>
              <span>/</span>
              <Link
                href="/blogs"
                className="hover:text-indigo-600 transition-colors"
              >
                بلاگ
              </Link>
              {post.category && (
                <>
                  <span>/</span>
                  <Link
                    href={`/blog?category=${post.category}`}
                    className="hover:text-indigo-600 transition-colors"
                  >
                    {post.category}
                  </Link>
                </>
              )}
            </nav>

            {/* Category badge */}
            {post.category && (
              <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full mb-4">
                {post.category}
              </span>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-xl text-gray-500 leading-relaxed mb-8">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              {post.author && (
                <span className="flex items-center gap-1.5">
                  <span className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                    {post.author.name.charAt(0)}
                  </span>
                  {post.author.name}
                </span>
              )}
              <span>{date}</span>
              {post.reading_time && <span>⏱ {post.reading_time}</span>}
              <span>👁 {post.views_count.toLocaleString("fa-IR")} بازدید</span>
            </div>
          </div>
        </div>

        {/* ── Featured Image ─────────────────────────────────────────── */}
        {post.featured_image && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-1">
            <div className="relative aspect-[21/9] rounded-2xl overflow-hidden shadow-lg">
              <Image
                src={post.featured_image}
                alt={post.title}
                fill
                priority
                sizes="(max-width:1280px) 100vw, 1280px"
                className="object-cover"
              />
            </div>
          </div>
        )}

        {/* ── Body ───────────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <div
            className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-xl prose-img:shadow-md
              prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* ── CTA Banner ─────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-violet-600 p-10 text-center text-white relative overflow-hidden shadow-xl">
            <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white opacity-5 blur-2xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-40 h-40 rounded-full bg-white opacity-5 blur-2xl pointer-events-none" />

            <div className="relative">
              <p className="text-indigo-200 text-sm font-medium uppercase tracking-wider mb-3">
                قدم بعدی شما
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {ctaTitle}
              </h2>
              <p className="text-indigo-200 max-w-md mx-auto mb-8 leading-relaxed">
                {ctaDesc}
              </p>
              <Link
                href={ctaUrl}
                className="inline-block bg-white text-indigo-600 font-bold px-10 py-4 rounded-full hover:bg-indigo-50 transition-colors shadow-lg text-base"
              >
                {ctaBtn} →
              </Link>
            </div>
          </div>
        </div>

        {/* ── Related Posts ──────────────────────────────────────────── */}
        {related.length > 0 && (
          <div className="bg-gray-50 border-t border-gray-100 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                مقالات مرتبط
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
