"use client";

import { useState } from "react";

interface BlogCreatorProps {
  onPostCreated: () => void;
}

export const BlogCreator = ({ onPostCreated }: BlogCreatorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imageUrl: "",
    tags: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create post");
      }

      setFormData({
        title: "",
        content: "",
        imageUrl: "",
        tags: "",
      });
      setIsOpen(false);
      onPostCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create post");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="blog-creator">
      <button onClick={() => setIsOpen(!isOpen)} className="nav-button mb-4">
        {isOpen ? "✖ Close" : "✏️ Create New Post"}
      </button>

      {isOpen && (
        <form onSubmit={handleSubmit} className="blog-form">
          <div className="form-group">
            <label>Admin Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Content:</label>
            <textarea
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
              rows={10}
            />
          </div>
          <div className="form-group">
            <label>Image URL (optional):</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />
          </div>
          <div className="form-group">
            <label>Tags (comma-separated):</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              placeholder="blog, update, news"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? "Creating..." : "Create Post"}
          </button>
        </form>
      )}
    </div>
  );
};
