"use client";

import { useState, useEffect } from "react";

interface GuestbookEntry {
  _id: string;
  name: string;
  message: string;
  email?: string;
  website?: string;
  favorite_color?: string;
  createdAt: string;
}

export default function Guestbook({
  setCurrentPage,
}: {
  setCurrentPage: (page: "home" | "blog" | "guestbook") => void;
}) {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    message: "",
    email: "",
    website: "",
    favorite_color: "#ff00ff",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/guestbook");
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error("Failed to fetch entries:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/guestbook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      setFormData({
        name: "",
        message: "",
        email: "",
        website: "",
        favorite_color: "#ff00ff",
      });

      await fetchEntries();
    } catch (error) {
      console.error("Failed to submit entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <button onClick={() => setCurrentPage("home")} className="nav-button">
        🏠 Back to Home
      </button>
      <div className="w-full max-w-4xl">
        <div className="guestbook-container">
          <div className="guestbook-form">
            <h2 className="glitter-text text-center mb-4 text-3xl">
              ⚡ Sign my Guestbook! ⚡
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  maxLength={50}
                  className="w-full mb-4"
                />
              </div>
              <div className="form-group">
                <label>Message:</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  maxLength={500}
                  className="w-full mb-4"
                />
              </div>
              <div className="form-group">
                <label>Email (optional):</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full mb-4"
                />
              </div>
              <div className="form-group">
                <label>Website (optional):</label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) =>
                    setFormData({ ...formData, website: e.target.value })
                  }
                  className="w-full mb-4"
                />
              </div>
              <div className="form-group">
                <label>Favorite Color:</label>
                <input
                  type="color"
                  value={formData.favorite_color}
                  className="h-12 w-full mb-4"
                  onChange={(e) =>
                    setFormData({ ...formData, favorite_color: e.target.value })
                  }
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="guestbook-submit-button w-full"
              >
                {isSubmitting ? "Signing..." : "✨ Sign Guestbook! ✨"}
              </button>
            </form>
          </div>

          <div className="guestbook-entries">
            <h3 className="glitter-text text-center mb-4">
              📖 Recent Signatures 📖
            </h3>
            {isLoading ? (
              <div className="loading">Loading signatures...</div>
            ) : (
              <div className="entries-list">
                {entries.map((entry) => (
                  <div key={entry._id} className="guestbook-entry">
                    <div className="entry-header">
                      <strong
                        style={{ color: entry.favorite_color }}
                        className="mr-3"
                      >
                        {entry.name}
                      </strong>
                      <span className="entry-date">
                        {new Date(entry.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p>{entry.message}</p>
                    {entry.website && (
                      <a
                        href={entry.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="website-link"
                      >
                        🌐 My Website
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
