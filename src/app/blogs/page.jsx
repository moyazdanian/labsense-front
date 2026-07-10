// components/blog/HomepageBlogSection.tsx
// Usage: <HomepageBlogSection /> inside your homepage  (Server Component)

import { getFeaturedPosts } from "@/lib/blog-api";
import BlogCard from "./BlogCard";
import MedicalLoading from "@/components/Loading";
import Link from "next/link";

export default async function HomepageBlogSection() {
  let posts = [];
  try {
    posts = await getFeaturedPosts(6);
    console.log(posts);
  } catch (err) {
    console.log(err);

    return null; // fail silently — don't break the homepage
  }

  if (!posts.length) return <MedicalLoading />;

  return (
    <section
      className="py-20"
      aria-labelledby="blog-section-heading"
    >
      <nav
        aria-label="breadcrumb"
        className="text-sm text-gray-400 mb-6 flex items-center gap-2"
      >
        <Link href="/" className="hover:text-indigo-600 transition-colors">
          خانه
        </Link>
        <span>/</span>
        <Link href="/blogs" className="hover:text-indigo-600 transition-colors">
          بلاگ
        </Link>
      
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <div className="text-center">
            <h1 className="font-extrabold text-4xl mb-2">آخرین مقالات</h1>
            <p className="mt-3 text-gray-500 ">
              راهنماها، نکات و تجربیات کاربردی.
            </p>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
