"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface GuestbookEntry {
  _id: string;
  name: string;
  message: string;
  createdAt: string;
  favorite_color: string;
}

export const GuestbookPreview = () => {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch("/api/guestbook");
        const data = await response.json();
        setEntries(data.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch entries:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="guestbook-preview-container">
      <div className="preview-monitor">
        <div className="monitor-screen">
          <div className="screen-header">
            <div className="screen-buttons">
              <span className="screen-button"></span>
              <span className="screen-button"></span>
              <span className="screen-button"></span>
            </div>
            <div className="screen-title">LATEST MESSAGES</div>
          </div>
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-bar">
                <div className="loading-progress"></div>
              </div>
              <div className="loading-text">LOADING...</div>
            </div>
          ) : (
            <div className="entries-container">
              {entries.map((entry) => (
                <div key={entry._id} className="preview-entry-card">
                  <div className="entry-scanline"></div>
                  <div className="entry-content">
                    <span
                      className="entry-name"
                      style={{ color: entry.favorite_color }}
                    >
                      {`>${entry.name}`}
                    </span>
                    <span className="entry-message">
                      {entry.message.slice(0, 50)}
                      {entry.message.length > 50 ? "..." : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Link href="/guestbook" className="preview-action-button">
        <span className="button-text">ACCESS GUESTBOOK TERMINAL</span>
        <span className="button-arrow">►</span>
      </Link>
    </div>
  );
};
