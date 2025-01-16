"use client";

import { useState } from "react";
import Blog from "@/components/pages/Blog";
import Guestbook from "@/components/pages/Guestbook";
import Home from "@/components/pages/Home";
import Questions from "@/components/pages/Questions";
import FreeIpod from "@/components/pages/FreeIpod";

type Page = "home" | "blog" | "guestbook" | "questions" | "free-ipod";

export const PageManager = () => {
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = () => {
    switch (currentPage) {
      case "blog":
        return <Blog setCurrentPage={setCurrentPage} />;
      case "guestbook":
        return <Guestbook setCurrentPage={setCurrentPage} />;
      case "questions":
        return <Questions setCurrentPage={setCurrentPage} />;
      case "free-ipod":
        return <FreeIpod setCurrentPage={setCurrentPage} />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  return <div>{renderPage()}</div>;
};
