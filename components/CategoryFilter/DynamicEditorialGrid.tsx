"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/types/blog";
import CategoryRibbon from "./CategoryRibbon";
import AdvancedFilterBar from "./AdvancedFilterBar";
import GridCard from "./GridCard";

const CATEGORIES = ["All", "Cooking", "Photography", "Places", "Tech"];

export default function DynamicEditorialGrid() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("ALL");
  const [selectedType, setSelectedType] = useState("ALL");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (res.ok) {
          const data = await res.json();
          // Exclude the featured hero post from the list so it doesn't double-display
          setPosts(data.filter((p: BlogPost) => p.id !== "featured-1"));
        }
      } catch (err) {
        console.error("Failed to fetch posts feed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter logic using useMemo for performance
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" || post.category === activeCategory;
      const matchesLocation =
        selectedLocation === "ALL" || post.location === selectedLocation;
      const matchesType =
        selectedType === "ALL" || post.postType === selectedType;

      return matchesCategory && matchesLocation && matchesType;
    });
  }, [posts, activeCategory, selectedLocation, selectedType]);

  const hasActiveFilters = selectedLocation !== "ALL" || selectedType !== "ALL";

  const handleResetFilters = () => {
    setSelectedLocation("ALL");
    setSelectedType("ALL");
  };

  return (
    <div className="space-y-8">
      {/* Category Pills Navigation */}
      <CategoryRibbon
        categories={CATEGORIES}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Advanced Filter Ribbon */}
      <AdvancedFilterBar
        selectedLocation={selectedLocation}
        selectedType={selectedType}
        onLocationChange={setSelectedLocation}
        onTypeChange={setSelectedType}
        onReset={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Dynamic Shuffling Grid */}
      {loading ? (
        <div className="text-xs text-editorial-muted py-12">Loading stories...</div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-xs text-editorial-muted py-12 border border-dashed border-editorial-border bg-editorial-card text-center">
          No articles match the selected filters.
        </div>
      ) : (
        <motion.div 
          layout 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post) => (
              <motion.div
                key={post.id}
                layout
                className="h-full"
              >
                <GridCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
