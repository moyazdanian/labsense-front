// components/blog/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ post }) {
  const date = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(post.published_at));

  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Thumbnail */}
      <Link
        href={`/blogs/${post.slug}`}
        className="block relative aspect-[16/9] overflow-hidden bg-gray-50"
      >
        {post.featured_image ? (
          <Image
            src={post.featured_image}
            alt={post.title}
            fill
            sizes="(max-width:768px) 100vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-100 flex items-center justify-center">
            <span className="text-4xl opacity-30">📝</span>
          </div>
        )}
        {post.category && (
          <span className="absolute top-3 right-3 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {post.category}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <Link href={`/blogs/${post.slug}`}>
          <h3 className="text-gray-900 font-semibold text-lg leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {post.title}
          </h3>
        </Link>

        {post.excerpt && (
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-50">
          <span>{date}</span>
          <div className="flex items-center gap-3">
            {post.reading_time && <span>⏱ {post.reading_time}</span>}
            {post.author && <span>✍️ {post.author.name}</span>}
          </div>
        </div>
      </div>
    </article>
  );
}
