"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Clock, Activity } from "lucide-react";
import { BlogPost } from "@/types/blog";

interface GridCardProps {
  post: BlogPost;
}

export default function GridCard({ post }: GridCardProps) {
  const isRecipe = post.postType === "Recipe";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col space-y-4 border border-editorial-border bg-white p-5 group h-full justify-between hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out"
    >
      <div className="space-y-4">
        {/* Card Thumbnail */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-editorial-card border border-editorial-border">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
          />
          {/* Post Type Badge */}
          <span className="absolute top-3 right-3 text-[9px] font-bold tracking-widest bg-white/95 backdrop-blur-sm px-2.5 py-1 text-editorial-text border border-editorial-border">
            {post.postType}
          </span>
        </div>

        {/* Content Details */}
        <div className="space-y-3">
          {/* Category & Metadata Ribbon */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[9px] font-bold tracking-widest text-editorial-muted">
            <span className="bg-editorial-card text-editorial-text px-2 py-0.5 border border-editorial-border rounded-sm">
              {post.category}
            </span>
            <span className="w-1.5 h-1.5 bg-editorial-border rounded-full"></span>
            <span className="flex items-center gap-1">
              <MapPin className="w-2.5 h-2.5" />
              {post.location}
            </span>
          </div>

          {/* Article Title */}
          <h3 className="font-display text-lg md:text-xl font-black tracking-tight text-editorial-text group-hover:text-editorial-muted transition-colors duration-300 leading-snug">
            <Link href={`/blog/${post.slug}`} className="focus:outline-none">
              {post.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs text-editorial-muted leading-relaxed font-sans font-light line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </div>

      <div className="space-y-3 pt-4 border-t border-editorial-border mt-4">
        {/* Optional Recipe Stats Overlay */}
        {isRecipe && (post.prepTime || post.difficulty) && (
          <div className="flex items-center justify-between text-[9px] font-bold tracking-widest text-editorial-muted bg-editorial-card p-2 border border-editorial-border">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.prepTime}
            </span>
            <span className="w-1.5 h-1.5 bg-editorial-border rounded-full"></span>
            <span className="flex items-center gap-1">
              <Activity className="w-3.5 h-3.5" />
              {post.difficulty}
            </span>
          </div>
        )}

        {/* Card Author & Details Foot */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-editorial-border">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                sizes="28px"
                className="object-cover"
              />
            </div>
            <span className="text-[10px] font-semibold text-editorial-text">{post.author.name}</span>
          </div>
          <span className="text-[9px] font-bold tracking-wider text-editorial-muted">{post.readingTime}</span>
        </div>
      </div>
    </motion.article>
  );
}
