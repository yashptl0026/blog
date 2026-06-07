"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Trash2, Plus, ArrowLeft, CheckCircle, FileText } from "lucide-react";
import { BlogPost, BlogCategory, BlogLocation, BlogPostType } from "@/types/blog";

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  // Authentication states
  const [adminKey, setAdminKey] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState("");

  // Form states
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState<BlogCategory>("Cooking");
  const [location, setLocation] = useState<BlogLocation>("Global");
  const [postType, setPostType] = useState<BlogPostType>("Long-form");
  const [coverImage, setCoverImage] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [authorAvatar, setAuthorAvatar] = useState("");
  const [prepTime, setPrepTime] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Check storage for key on mount
  useEffect(() => {
    const savedKey = localStorage.getItem("aesthete_admin_key");
    if (savedKey) {
      setAdminKey(savedKey);
    }
    setAuthChecked(true);
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch("/api/posts");
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error("Failed to load posts", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch posts when authenticated
  useEffect(() => {
    if (adminKey) {
      fetchPosts();
    }
  }, [adminKey]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/auth/verify", {
        headers: {
          "x-admin-key": passwordInput,
        },
      });
      if (res.ok) {
        localStorage.setItem("aesthete_admin_key", passwordInput);
        setAdminKey(passwordInput);
      } else {
        setAuthError("Invalid admin access key.");
      }
    } catch (err) {
      setAuthError("Connection error. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("aesthete_admin_key");
    setAdminKey(null);
    setPasswordInput("");
  };

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !coverImage || !authorName) return;

    setIsSubmitting(true);
    setSuccessMsg("");

    try {
      const payload = {
        title,
        subtitle,
        excerpt,
        category,
        location,
        postType,
        coverImage,
        author: {
          name: authorName,
          avatar: authorAvatar,
        },
        prepTime,
        difficulty,
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey || "",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSuccessMsg("Article published successfully!");
        setTitle("");
        setSubtitle("");
        setExcerpt("");
        setCoverImage("");
        setAuthorName("");
        setAuthorAvatar("");
        setPrepTime("");

        await fetchPosts();
        setTimeout(() => setSuccessMsg(""), 5000);
      } else {
        const data = await res.json();
        setSuccessMsg(data.error || "Failed to publish article.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm("Are you sure you want to delete this story?")) return;

    try {
      const res = await fetch(`/api/posts?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-key": adminKey || "",
        },
      });

      if (res.ok) {
        await fetchPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-xs text-editorial-muted animate-pulse">Checking access status...</div>
      </div>
    );
  }

  if (!adminKey) {
    return (
      <main className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-left">
        <div className="w-full max-w-sm border border-editorial-border p-8 md:p-10 space-y-8 bg-white shadow-sm">
          <div className="space-y-2">
            <Link
              href="/"
              className="font-display text-lg font-black tracking-tighter text-editorial-text hover:text-editorial-muted transition-colors duration-300 uppercase block"
            >
              Aesthete
            </Link>
            <h1 className="font-display text-xl font-black text-editorial-text tracking-tight uppercase">
              Admin Access
            </h1>
            <p className="text-[10px] text-editorial-muted leading-relaxed font-light">
              This area is restricted. Please enter the administration access key to unlock.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="admin-pass" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">
                Access Key
              </label>
              <input
                id="admin-pass"
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-editorial-border px-3 py-2.5 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text"
              />
              {authError && (
                <p className="text-[10px] text-red-600 font-semibold pt-1">
                  {authError}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center bg-editorial-text text-white px-5 py-3 hover:bg-editorial-muted transition-colors duration-300 font-display text-[9px] font-bold tracking-widest uppercase shadow-sm"
              >
                Authenticate
              </button>
              <Link
                href="/"
                className="w-full text-center text-[9px] font-bold text-editorial-muted hover:text-editorial-text py-2 transition-colors tracking-widest uppercase"
              >
                Back to Journal
              </Link>
            </div>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white max-w-7xl mx-auto px-6 md:px-16 py-12 space-y-16">
      {/* Header Panel */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-6 border-b border-editorial-border gap-6">
        <div className="space-y-2 text-left">
          <Link
            href="/"
            className="group inline-flex items-center gap-1 text-[10px] font-bold tracking-widest text-editorial-muted hover:text-editorial-text transition-colors duration-300"
          >
            <ArrowLeft className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" />
            <span>BACK TO JOURNAL</span>
          </Link>
          <h1 className="font-display text-3xl md:text-4.5xl text-editorial-text font-black tracking-tight uppercase">
            Admin Dashboard
          </h1>
          <p className="text-xs text-editorial-muted font-light leading-relaxed">
            Create, view, and delete articles inside the global blog state.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-semibold tracking-widest border border-editorial-text px-4 py-2 hover:bg-editorial-text hover:text-editorial-bg transition-all duration-300 rounded-none uppercase"
        >
          Logout
        </button>
      </header>

      {/* Main Grid: Create form Left, Manage list Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Create Post Section (Left 5 Cols) */}
        <section className="lg:col-span-5 bg-editorial-card p-6 border border-editorial-border space-y-6">
          <h2 className="font-display text-sm font-black tracking-wider uppercase text-editorial-text flex items-center gap-2">
            <Plus className="w-4 h-4 text-editorial-accent" />
            <span>Publish New Post</span>
          </h2>

          <form onSubmit={handleAddPost} className="space-y-4 text-left">
            {/* Title */}
            <div className="space-y-1">
              <label htmlFor="title-input" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Title</label>
              <input
                id="title-input"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Concrete Architecture in Mumbai"
                className="w-full bg-white border border-editorial-border px-3 py-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text"
              />
            </div>

            {/* Subtitle */}
            <div className="space-y-1">
              <label htmlFor="subtitle-input" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Subtitle</label>
              <input
                id="subtitle-input"
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="e.g. Exploring raw Brutalism and spatial geometries..."
                className="w-full bg-white border border-editorial-border px-3 py-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text"
              />
            </div>

            {/* Selects: Category, Location, Type */}
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label htmlFor="category-select" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Category</label>
                <select
                  id="category-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as BlogCategory)}
                  className="w-full bg-white border border-editorial-border py-1.5 px-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text cursor-pointer"
                >
                  <option value="Cooking">Cooking</option>
                  <option value="Photography">Photography</option>
                  <option value="Places">Places</option>
                  <option value="Tech">Tech</option>
                  <option value="Travel">Travel</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="location-select" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Location</label>
                <select
                  id="location-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value as BlogLocation)}
                  className="w-full bg-white border border-editorial-border py-1.5 px-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text cursor-pointer"
                >
                  <option value="India">India</option>
                  <option value="Europe">Europe</option>
                  <option value="Global">Global</option>
                </select>
              </div>

              <div className="space-y-1">
                <label htmlFor="type-select" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Format</label>
                <select
                  id="type-select"
                  value={postType}
                  onChange={(e) => setPostType(e.target.value as BlogPostType)}
                  className="w-full bg-white border border-editorial-border py-1.5 px-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text cursor-pointer"
                >
                  <option value="Long-form">Long-form</option>
                  <option value="Recipe">Recipe</option>
                  <option value="Quick Read">Quick Read</option>
                  <option value="Gallery">Gallery</option>
                </select>
              </div>
            </div>

            {/* Recipe dynamic options */}
            {postType === "Recipe" && (
              <div className="grid grid-cols-2 gap-3 bg-white p-3 border border-editorial-border">
                <div className="space-y-1">
                  <label htmlFor="prep-time-input" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Prep Time</label>
                  <input
                    id="prep-time-input"
                    type="text"
                    value={prepTime}
                    onChange={(e) => setPrepTime(e.target.value)}
                    placeholder="e.g. 35 mins"
                    className="w-full bg-editorial-card border border-editorial-border px-3 py-1.5 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text"
                  />
                </div>
                <div className="space-y-1">
                  <label htmlFor="difficulty-select" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Difficulty</label>
                  <select
                    id="difficulty-select"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
                    className="w-full bg-editorial-card border border-editorial-border py-1.5 px-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text cursor-pointer"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>
            )}

            {/* Cover Image URL */}
            <div className="space-y-1">
              <label htmlFor="image-input" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Cover Image URL</label>
              <input
                id="image-input"
                type="text"
                required
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="e.g. https://images.unsplash.com/photo-..."
                className="w-full bg-white border border-editorial-border px-3 py-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text"
              />
            </div>

            {/* Author details */}
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label htmlFor="author-input" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Author Name</label>
                <input
                  id="author-input"
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Evelyn Thorne"
                  className="w-full bg-white border border-editorial-border px-3 py-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text"
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="avatar-input" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Author Avatar URL</label>
                <input
                  id="avatar-input"
                  type="text"
                  value={authorAvatar}
                  onChange={(e) => setAuthorAvatar(e.target.value)}
                  placeholder="e.g. https://images.unsplash.com/..."
                  className="w-full bg-white border border-editorial-border px-3 py-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text"
                />
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-1">
              <label htmlFor="excerpt-input" className="text-[9px] font-bold text-editorial-muted uppercase tracking-wider block">Excerpt / Description</label>
              <textarea
                id="excerpt-input"
                required
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Describe the article premise..."
                className="w-full bg-white border border-editorial-border px-3 py-2 text-xs focus:border-editorial-text focus:outline-none rounded-none text-editorial-text resize-none"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center bg-editorial-text text-white px-5 py-3 hover:bg-editorial-muted transition-colors duration-300 font-display text-[9px] font-bold tracking-widest disabled:opacity-50 uppercase shadow-sm"
            >
              {isSubmitting ? "Publishing..." : "Publish Post"}
            </button>

            {successMsg && (
              <div className="flex items-center gap-2 text-green-600 text-xs font-semibold pt-2">
                <CheckCircle className="w-4 h-4" />
                <span>{successMsg}</span>
              </div>
            )}
          </form>
        </section>

        {/* Manage Posts Section (Right 7 Cols) */}
        <section className="lg:col-span-7 space-y-6">
          <h2 className="font-display text-sm font-black tracking-wider uppercase text-editorial-text flex items-center gap-2">
            <FileText className="w-4 h-4 text-editorial-accent" />
            <span>Manage Published Posts ({posts.length})</span>
          </h2>

          {loading ? (
            <div className="text-xs text-editorial-muted py-12">Loading posts database...</div>
          ) : posts.length === 0 ? (
            <div className="text-xs text-editorial-muted py-12 border border-dashed border-editorial-border bg-editorial-card text-center">
              No posts found. Publish an article to populate the database.
            </div>
          ) : (
            <div className="border border-editorial-border overflow-hidden rounded-none shadow-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-editorial-card border-b border-editorial-border text-[9px] font-bold uppercase tracking-wider text-editorial-muted">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-editorial-border">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-editorial-card/40 transition-colors">
                      <td className="py-3 px-4 font-semibold text-editorial-text truncate max-w-[200px]" title={post.title}>
                        {post.title}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-editorial-card text-editorial-text px-2 py-0.5 border border-editorial-border rounded-sm">
                          {post.category}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-editorial-muted">{post.postType}</td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="text-editorial-muted hover:text-red-600 p-1.5 transition-colors"
                          aria-label={`Delete ${post.title}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
