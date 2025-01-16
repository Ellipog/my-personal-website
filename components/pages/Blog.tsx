import { BlogList } from "@/components/BlogList";
import { BlogCreator } from "@/components/BlogCreator";
import { useCallback, useRef } from "react";

export default function Blog({
  setCurrentPage,
}: {
  setCurrentPage: (page: "home" | "blog" | "guestbook") => void;
}) {
  const blogListRef = useRef<{ fetchPosts: () => Promise<void> }>(null);

  const handlePostCreated = useCallback(() => {
    blogListRef.current?.fetchPosts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-4">
          <button onClick={() => setCurrentPage("home")} className="nav-button">
            🏠 Back to Home
          </button>
        </div>
        <BlogList ref={blogListRef} />
        <BlogCreator onPostCreated={handlePostCreated} />
      </div>
    </div>
  );
}
