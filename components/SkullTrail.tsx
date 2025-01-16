"use client";

import { useEffect } from "react";

export const SkullTrail = () => {
  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    let skulls: HTMLImageElement[] = [];

    const createSkull = (x: number, y: number) => {
      const skull = document.createElement("img");
      skull.className = "skull-trail";
      skull.src = "/gifs/skull.gif";
      skull.style.left = `${x}px`;
      skull.style.top = `${y}px`;
      skull.alt = "skull";
      document.body.appendChild(skull);
      skulls.push(skull);

      // Remove skull after animation
      setTimeout(() => {
        skull.remove();
        skulls = skulls.filter((s) => s !== skull);
      }, 1000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      // Only create new skull if mouse has moved enough
      if (Math.abs(x - lastX) + Math.abs(y - lastY) > 20) {
        createSkull(x, y);
        lastX = x;
        lastY = y;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      skulls.forEach((skull) => skull.remove());
    };
  }, []);

  return null;
};
