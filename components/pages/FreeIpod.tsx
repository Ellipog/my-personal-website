"use client";

import { useState } from "react";
import { Press_Start_2P } from "next/font/google";
import Image from "next/image";
import { Marquee } from "@/components/Marquee";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function FreeIpod({
  setCurrentPage,
}: {
  setCurrentPage: (page: "home" | "blog" | "guestbook" | "questions") => void;
}) {
  const [entries, setEntries] = useState(0);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setSubmitted(true);
    setIsSubmitting(false);
    setEntries((prev) => prev + 1);
  };

  const shareText =
    "Wow I just entered the giveaway for a FREE iPod Classic 160GB. You can too at https://myawesomecoolwebsite.aaenz.no";

  const handleShare = async (platform: string) => {
    try {
      await navigator.clipboard.writeText(shareText);
      const button = document.querySelector(`[data-platform="${platform}"]`);
      if (button) {
        const originalText = button.textContent;
        button.textContent = "Copied!";
        setTimeout(() => {
          button.textContent = originalText;
        }, 2000);
      }
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen p-8 ${pressStart2P.className}`}
    >
      <button
        onClick={() => setCurrentPage("home")}
        className="nav-button mb-4"
      >
        🏠 Back to Home
      </button>

      <div className="ipod-container">
        <div className="blink-warning mb-4">
          🎯 CONGRATULATIONS! YOU ARE TODAY&apos;S LUCKY VISITOR! 🎯
        </div>

        <div className="ipod-image-container">
          <Image
            src="/img/ipod.png"
            alt="Win this iPod!"
            width={300}
            height={300}
            className="spinning-ipod"
          />
          <div className="flash-overlay"></div>
        </div>

        <h1 className="rainbow-text text-2xl my-4">
          Win a FREE iPod Classic 160GB!
        </h1>

        <div className="prize-details">
          <Marquee scrollamount={3}>
            ⭐ HURRY! Only 9999 iPods left to give away! ⭐
          </Marquee>

          <div className="feature-list">
            <p>✨ Holds up to 40,000 songs!</p>
            <p>✨ Up to 40 hours of battery life!</p>
            <p>✨ Comes in ANY color (as long as it&apos;s white)!</p>
            <p>✨ FREE shipping via certified mail from Nigeria!</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="entry-form">
              <div className="form-group">
                <label>Enter Your Email:</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full mb-4"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="win-button"
              >
                {isSubmitting
                  ? "Processing..."
                  : "🎁 CLAIM YOUR FREE iPOD NOW! 🎁"}
              </button>
            </form>
          ) : (
            <div className="success-message">
              <p>🎉 CONGRATULATIONS! 🎉</p>
              <p>You have {entries} entries!</p>
              <p>Share with 10 friends to DOUBLE your chances!</p>
              <div className="share-buttons">
                <button
                  data-platform="MySpace"
                  onClick={() => handleShare("MySpace")}
                >
                  Share on MySpace
                </button>
                <button
                  data-platform="Friendster"
                  onClick={() => handleShare("Friendster")}
                >
                  Share on Friendster
                </button>
                <button data-platform="Hi5" onClick={() => handleShare("Hi5")}>
                  Share on Hi5
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="disclaimer">
          * No purchase necessary. Void where prohibited. iPod giveaway
          sponsored by totally legitimate Nigerian prince. Winner must provide
          bank account details for shipping verification. Results may vary.
          Battery not included.
        </div>
      </div>
    </div>
  );
}
