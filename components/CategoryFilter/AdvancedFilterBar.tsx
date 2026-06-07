"use client";

import { SlidersHorizontal, RotateCcw } from "lucide-react";

interface AdvancedFilterBarProps {
  selectedLocation: string;
  selectedType: string;
  onLocationChange: (location: string) => void;
  onTypeChange: (type: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

export default function AdvancedFilterBar({
  selectedLocation,
  selectedType,
  onLocationChange,
  onTypeChange,
  onReset,
  hasActiveFilters,
}: AdvancedFilterBarProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-editorial-border text-xs">
      {/* Title / Info Row */}
      <div className="flex items-center gap-2 text-editorial-muted font-medium">
        <SlidersHorizontal className="w-3.5 h-3.5 text-editorial-accent" />
        <span className="tracking-wider text-[10px]">Filter Library</span>
      </div>

      {/* Dropdowns Row */}
      <div className="flex flex-wrap items-center gap-3 sm:gap-4">
        {/* Location Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="location-select" className="text-editorial-muted text-[10px] tracking-wider font-semibold">
            Location:
          </label>
          <select
            id="location-select"
            value={selectedLocation}
            onChange={(e) => onLocationChange(e.target.value)}
            className="bg-transparent border border-editorial-border py-1.5 px-3 pr-8 rounded-none text-editorial-text focus:border-editorial-accent focus:outline-none cursor-pointer font-sans tracking-wide appearance-none relative"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B6661' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.25em 1.25em",
              backgroundRepeat: "no-repeat",
            }}
          >
            <option value="ALL">All Locations</option>
            <option value="India">India</option>
            <option value="Europe">Europe</option>
            <option value="Global">Global</option>
          </select>
        </div>

        {/* Post Type Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="type-select" className="text-editorial-muted text-[10px] tracking-wider font-semibold">
            Type:
          </label>
          <select
            id="type-select"
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="bg-transparent border border-editorial-border py-1.5 px-3 pr-8 rounded-none text-editorial-text focus:border-editorial-accent focus:outline-none cursor-pointer font-sans tracking-wide appearance-none relative"
            style={{
              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B6661' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
              backgroundPosition: "right 0.5rem center",
              backgroundSize: "1.25em 1.25em",
              backgroundRepeat: "no-repeat",
            }}
          >
            <option value="ALL">All Formats</option>
            <option value="Long-form">Long-form</option>
            <option value="Recipe">Recipe</option>
            <option value="Quick Read">Quick Read</option>
            <option value="Gallery">Gallery</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-editorial-accent hover:text-editorial-text transition-colors duration-300 font-bold tracking-widest text-[9px] py-1.5 px-2"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        )}
      </div>
    </div>
  );
}
