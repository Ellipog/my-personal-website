"use client";

import { useEffect, useState } from "react";

export const VisitorCounter = () => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await fetch("/api/visitors");
        if (!response.ok) throw new Error("Failed to fetch count");
        const data = await response.json();
        setCount(data.count);
      } catch (err) {
        setError("Failed to load visitor count");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCount();
  }, []);

  const digits = count.toString().padStart(6, "0").split("");

  if (error) {
    return (
      <div className="visitor-counter">
        <div className="counter-text">Error loading counter :(</div>
      </div>
    );
  }

  return (
    <div className="visitor-counter">
      <div className="counter-text">
        {isLoading ? "Loading..." : "You are visitor number:"}
      </div>
      <div className="counter-display">
        {digits.map((digit, index) => (
          <span key={index} className="counter-digit">
            {isLoading ? "0" : digit}
          </span>
        ))}
      </div>
    </div>
  );
};
