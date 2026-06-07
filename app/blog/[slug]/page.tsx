import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ArticleHeader from "@/components/Article/ArticleHeader";
import ArticleBody, { ArticleBlock } from "@/components/Article/ArticleBody";
import ReviewSection from "@/components/Article/ReviewSection";
import { Review } from "@/types/blog";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Mock database fetching based on slug
async function getPostBySlug(slug: string) {
  if (slug !== "silent-architecture-minimalist-living") {
    return null;
  }

  const blocks: ArticleBlock[] = [
    {
      type: "paragraph",
      text: "Space is not merely an empty canvas to be filled, but a physical material to be shaped. In modern architecture, the pursuit of minimalist living has shifted away from sterile vacuum-sealed spaces towards a tactile narrative. It is a philosophy of editing—a conscious decision of what to exclude in order to amplify the presence of what remains. Concrete, travertine, white oak, and raw linen become the tactile vocabulary of a home, groundings for our hyper-stimulated sensory realities.",
    },
    {
      type: "paragraph",
      text: "When Evelyn Thorne set out to design the Wabi-Sabi sanctuary in the Pacific Northwest, the goal was simple: design a container for light. By minimizing partitions and allowing shadows to pool in the corners, the house changes throughout the day. Light becomes a physical occupant. In the living room, the Oak Lounge chair sits alone, silhouetted against a rough plaster wall.",
    },
    {
      type: "blockquote",
      text: "Simplicity is not the lack of something, but the absolute presence of clarity.",
      cite: "Evelyn Thorne, Principal Designer",
    },
    {
      type: "paragraph",
      text: "The selection of furniture is treated with the same editing process. Every piece must possess architectural weight. Rather than overcrowding the visual plane, a singular handmade travertine side table serves both as storage and raw ornament, anchoring the seating group.",
    },
    {
      type: "product",
      product: {
        id: "p1",
        name: "Oak Wabi-Sabi Lounge Chair",
        category: "Furniture",
        price: "$1,850",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=600&auto=format&fit=crop",
        link: "/shop/wabi-sabi-lounge-chair",
        description: "Handcrafted from solid European white oak. Designed with a deep, angled seat and exposed joinery representing traditional Japanese craft.",
      },
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=1600&auto=format&fit=crop",
      alt: "Minimalist living space lit by natural sunlight",
      caption: "Natural daylight filtering across raw plaster walls and structured stone accents.",
    },
    {
      type: "paragraph",
      text: "Ultimately, living in a space that has been edited invites a mental stillness. It removes the friction of visual clutter. As we inhabit these curated sanctuaries, we learn to appreciate the grain of wood, the cold touch of stone, and the passage of time marked by the moving sun.",
    },
  ];

  return {
    title: "The Silent Architecture of Minimalist Living Spaces",
    subtitle: "How spatial editing and raw materiality shape modern sensory sanctuaries.",
    category: "INTERIORS",
    date: "June 07, 2026",
    readingTime: "5 min read",
    slug: "silent-architecture-minimalist-living",
    coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
    author: {
      name: "Evelyn Thorne",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
    },
    blocks,
  };
}

async function getRelatedPosts() {
  return [
    {
      title: "Raw Materiality: Designing with Unfinished Travertine",
      slug: "raw-materiality-unfinished-travertine",
      category: "DESIGN",
      coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    },
    {
      title: "Tactile Textures: The Resurgence of Belgian Linen in Soft Goods",
      slug: "tactile-textures-belgian-linen-soft-goods",
      category: "TEXTILES",
      coverImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600&auto=format&fit=crop",
    },
  ];
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: "r-1",
    name: "Aarav Gupta",
    email: "aarav@example.com",
    rating: 5,
    comment: "This article perfectly captures why editing is a spatial material. The wabi-sabi principles are so well explained.",
    date: "June 07, 2026",
  },
  {
    id: "r-2",
    name: "Sonia Varma",
    email: "sonia@example.com",
    rating: 4,
    comment: "A beautiful read. I love the minimalist photography embedded in the article.",
    date: "June 06, 2026",
  },
];

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts();

  // Create JSON-LD Structured Data Schema for Google Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.subtitle,
    "image": [post.coverImage],
    "datePublished": new Date(post.date).toISOString(),
    "dateModified": new Date(post.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "AESTHETE",
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.5",
      "reviewCount": "2",
    },
  };

  return (
    <main className="min-h-screen py-8 max-w-7xl mx-auto flex flex-col justify-between bg-white">
      {/* Google SEO Rich Snippet Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Editorial Navigation */}
      <header className="px-6 md:px-16 flex justify-between items-center py-6 border-b border-editorial-border">
        <Link 
          href="/" 
          className="font-display text-2xl font-black tracking-widest text-editorial-text hover:text-editorial-muted transition-colors duration-300"
        >
          A E S T H E T E
        </Link>
        <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-wider text-editorial-muted">
          <Link href="/journal" className="hover:text-editorial-text transition-colors">JOURNAL</Link>
          <Link href="/curations" className="hover:text-editorial-text transition-colors">CURATIONS</Link>
          <Link href="/about" className="hover:text-editorial-text transition-colors">ABOUT</Link>
          <Link href="/shop" className="hover:text-editorial-text transition-colors">SHOP</Link>
        </nav>
        <Link
          href="/subscribe"
          className="text-xs font-semibold tracking-widest border border-editorial-text px-4 py-2 hover:bg-editorial-text hover:text-editorial-bg transition-all duration-300 rounded-none"
        >
          SUBSCRIBE
        </Link>
      </header>

      {/* Article Spread */}
      <article className="px-6 md:px-16 py-12 space-y-12">
        {/* Header Block */}
        <ArticleHeader post={post} />

        {/* Hero Banner Image */}
        <div className="relative w-full h-[50vh] sm:h-[70vh] border border-editorial-border overflow-hidden bg-editorial-card">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Content Body Block */}
        <ArticleBody blocks={post.blocks} />

        {/* Review System Block (Interactive rating + feedback + mock email triggers) */}
        <div className="px-4 sm:px-0">
          <ReviewSection initialReviews={INITIAL_REVIEWS} postTitle={post.title} />
        </div>
      </article>

      {/* Related Reading / Bottom Layout */}
      <section className="px-6 md:px-16 py-16 bg-editorial-card border-t border-b border-editorial-border">
        <div className="max-w-3xl mx-auto space-y-8">
          <h3 className="font-display text-2.5xl font-black uppercase tracking-tight text-editorial-text">Related Journal Entries</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="group block space-y-4"
              >
                <div className="relative w-full h-48 border border-editorial-border overflow-hidden bg-editorial-card">
                  <Image
                    src={related.coverImage}
                    alt={related.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 384px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-bold tracking-widest text-editorial-muted uppercase">
                    {related.category}
                  </span>
                  <h4 className="font-display text-lg font-bold uppercase tracking-tight text-editorial-text group-hover:text-editorial-muted transition-colors duration-300 line-clamp-2">
                    {related.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <footer className="px-6 md:px-16 flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 gap-4 text-xs tracking-wider text-editorial-muted font-sans mt-8">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-editorial-text rounded-full animate-pulse"></span>
          <span>ESTABLISHED 2026 — ALL RIGHTS RESERVED</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-editorial-text transition-colors">PRIVACY</Link>
          <Link href="/terms" className="hover:text-editorial-text transition-colors">TERMS</Link>
          <Link href="/instagram" className="hover:text-editorial-text transition-colors inline-flex items-center gap-1">
            INSTAGRAM <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
