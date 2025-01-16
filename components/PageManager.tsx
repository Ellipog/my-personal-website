"use client";

import { useState } from "react";
import Blog from "@/components/pages/Blog";
import Guestbook from "@/components/pages/Guestbook";
import Home from "@/components/pages/Home";

export const PageManager = () => {
  const [currentPage, setCurrentPage] = useState<"home" | "blog" | "guestbook">(
    "home"
  );

  const renderPage = () => {
    switch (currentPage) {
      case "blog":
        return <Blog setCurrentPage={setCurrentPage} />;
      case "guestbook":
        return <Guestbook setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return <div>{renderPage()}</div>;
};
