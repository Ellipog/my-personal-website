import { useState, useEffect } from "react";
import Image from "next/image";

interface WebRingSite {
  name: string;
  url: string;
  description: string;
}

const webRingSites: WebRingSite[] = [
  {
    name: "Portfolio - Windows XP",
    url: "https://portfolio.aaenz.com",
    description: "My portfolio, made to look like and work like Windows XP!",
  },
];

export const WebRing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleNavigation = (direction: "prev" | "next" | "random") => {
    setIsRotating(true);

    setTimeout(() => {
      if (direction === "prev") {
        setCurrentIndex((prev) =>
          prev === 0 ? webRingSites.length - 1 : prev - 1
        );
      } else if (direction === "next") {
        setCurrentIndex((prev) =>
          prev === webRingSites.length - 1 ? 0 : prev + 1
        );
      } else {
        const randomIndex = Math.floor(Math.random() * webRingSites.length);
        setCurrentIndex(randomIndex);
      }
      setIsRotating(false);
    }, 500);
  };

  const handleVisit = () => {
    window.open(webRingSites[currentIndex].url, "_blank");
  };

  return (
    <div className="webring-container">
      <div className="webring-title">
        <span className="star-left">★</span>
        TOTALLY RAD WEB RING
        <span className="star-right">★</span>
      </div>

      <div className="webring-display">
        <div className={`ring-content ${isRotating ? "rotating" : ""}`}>
          <div className="site-info">
            <h3>{webRingSites[currentIndex].name}</h3>
            <p>{webRingSites[currentIndex].description}</p>
            <button
              onClick={handleVisit}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`visit-button ${isHovering ? "hover" : ""}`}
            >
              <span className="visit-text">ENTER SITE</span>
            </button>
          </div>
        </div>
      </div>

      <div className="webring-controls">
        <button
          onClick={() => handleNavigation("prev")}
          className="control-button prev-button"
        >
          ◄ Previous
        </button>
        <button
          onClick={() => handleNavigation("random")}
          className="control-button random-button"
        >
          ⟲ Random
        </button>
        <button
          onClick={() => handleNavigation("next")}
          className="control-button next-button"
        >
          Next ►
        </button>
      </div>

      <div className="member-count">
        <span className="blink">⚡</span>
        Member #{currentIndex + 1} of {webRingSites.length}
        <span className="blink">⚡</span>
      </div>
    </div>
  );
};
