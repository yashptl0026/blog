"use client";

import { motion } from "framer-motion";

interface CategoryRibbonProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function CategoryRibbon({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryRibbonProps) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none border-b border-editorial-border py-4">
      <div className="flex justify-center md:justify-start items-center gap-2 px-1">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className="relative px-5 py-2.5 text-[10px] font-bold tracking-widest focus:outline-none transition-colors duration-300 z-10"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              {isActive && (
                <motion.span
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 bg-editorial-text rounded-none -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`transition-colors duration-300 ${
                  isActive ? "text-editorial-bg" : "text-editorial-muted hover:text-editorial-text"
                }`}
              >
                {category}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
