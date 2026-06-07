import HeroLayout from "@/components/Hero/HeroLayout";
import DynamicEditorialGrid from "@/components/CategoryFilter/DynamicEditorialGrid";
import VisualStories from "@/components/CategoryFilter/VisualStories";
import LatestRecipes from "@/components/CategoryFilter/LatestRecipes";
import { db } from "@/lib/db";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Server-side fetching from the global database cache
async function getFeaturedPost() {
  const post = await db.getPostBySlug("silent-architecture-minimalist-living");
  
  const defaultHotspots = [
    {
      id: "p1",
      x: 48,
      y: 65,
      name: "Oak Wabi-Sabi Lounge Chair",
      category: "Furniture",
      price: "$1,850",
      link: "/shop/wabi-sabi-lounge-chair",
    },
    {
      id: "p2",
      x: 82,
      y: 40,
      name: "Handmade Travertine Side Table",
      category: "Decor",
      price: "$620",
      link: "/shop/travertine-side-table",
    },
    {
      id: "p3",
      x: 25,
      y: 35,
      name: "Muted Linen Pleated Pendant",
      category: "Lighting",
      price: "$480",
      link: "/shop/linen-pleated-pendant",
    },
  ];

  if (!post) {
    return {
      id: "featured-1",
      title: "The Silent Architecture of Minimalist Living Spaces",
      subtitle: "How spatial editing and raw materiality shape modern sensory sanctuaries.",
      category: "Interiors",
      date: "June 07, 2026",
      readingTime: "5 min read",
      slug: "silent-architecture-minimalist-living",
      coverImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=1600&auto=format&fit=crop",
      author: {
        name: "Evelyn Thorne",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      },
      products: defaultHotspots,
    };
  }

  return {
    ...post,
    products: defaultHotspots,
  };
}

export default async function Home() {
  const featuredPost = await getFeaturedPost();

  return (
    <main className="min-h-screen px-6 md:px-16 py-8 flex flex-col justify-between max-w-7xl mx-auto">
      {/* Editorial Top Navigation */}
      <header className="flex justify-between items-center py-6 border-b border-editorial-border">
        <Link 
          href="/" 
          className="font-display text-2xl font-black tracking-tighter text-editorial-text hover:text-editorial-muted transition-colors duration-300"
          id="nav-logo"
        >
          Aesthete
        </Link>
        <nav className="hidden md:flex gap-8 text-xs font-semibold tracking-wider text-editorial-muted">
          <Link href="/journal" className="hover:text-editorial-text transition-colors" id="nav-journal">Journal</Link>
          <Link href="/curations" className="hover:text-editorial-text transition-colors" id="nav-curations">Curations</Link>
          <Link href="/about" className="hover:text-editorial-text transition-colors" id="nav-about">About</Link>
          <Link href="/shop" className="hover:text-editorial-text transition-colors" id="nav-shop">Shop</Link>
          <Link href="/admin" className="text-editorial-accent font-bold hover:text-editorial-muted transition-colors" id="nav-admin">Admin</Link>
        </nav>
        <Link
          href="/subscribe"
          className="text-xs font-semibold tracking-widest border border-editorial-text px-4 py-2 hover:bg-editorial-text hover:text-editorial-bg transition-all duration-300 rounded-none"
          id="nav-subscribe"
        >
          Subscribe
        </Link>
      </header>

      {/* Featured Editorial Post Hero Section */}
      <section className="py-12 md:py-20" aria-label="Featured Story">
        <HeroLayout featuredPost={featuredPost} />
      </section>

      {/* Dynamic Filterable Library Section */}
      <section className="py-16 md:py-24 border-t border-editorial-border" aria-label="Journal Library">
        <div className="space-y-12">
          <div className="text-center sm:text-left space-y-2">
            <span className="text-[10px] font-bold tracking-widest text-editorial-accent">
              Journal Library
            </span>
            <h2 className="font-display text-3xl md:text-4.5xl text-editorial-text font-black tracking-tight">
              Filter Stories
            </h2>
          </div>
          <DynamicEditorialGrid />
        </div>
      </section>

      {/* Curated Photography Stories (Server Component) */}
      <section className="py-16 md:py-24 border-t border-editorial-border" aria-label="Visual Stories Showcase">
        <VisualStories />
      </section>

      {/* Curated Cooking Recipes (Server Component) */}
      <section className="py-16 md:py-24 border-t border-editorial-border" aria-label="Latest Recipes Showcase">
        <LatestRecipes />
      </section>

      {/* Editorial Footer Ticker / Bottom Bar */}
      <footer className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-8 border-t border-editorial-border gap-4 text-xs tracking-wider text-editorial-muted font-sans mt-auto">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-editorial-accent rounded-full animate-pulse"></span>
          <span>Established 2026 — All Rights Reserved</span>
        </div>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:text-editorial-text transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-editorial-text transition-colors">Terms</Link>
          <Link href="/instagram" className="hover:text-editorial-text transition-colors inline-flex items-center gap-1">
            Instagram <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </footer>
    </main>
  );
}
