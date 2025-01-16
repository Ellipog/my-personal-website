"use client";

import {
  useEffect,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from "react";
import Image from "next/image";

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  imageUrl?: string;
  tags: string[];
  createdAt: string;
}

export const BlogList = forwardRef((_, ref) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/api/blog");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useImperativeHandle(ref, () => ({
    fetchPosts,
  }));

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loading-bar">
          <div className="loading-progress"></div>
        </div>
        <div className="loading-text">LOADING BLOG POSTS...</div>
      </div>
    );
  }

  return (
    <div className="blog-container">
      <h1 className="glitter-text text-center text-3xl mb-8">✨ My Blog ✨</h1>
      <div className="blog-posts">
        {posts.map((post) => (
          <div key={post._id} className="blog-post">
            <h2 className="post-title">{post.title}</h2>
            <div className="post-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
            {post.imageUrl && (
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={800}
                height={400}
                className="post-image"
              />
            )}
            <div className="post-content">{post.content}</div>
            <div className="post-tags">
              {post.tags.map((tag, index) => (
                <span key={index} className="post-tag">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

BlogList.displayName = "BlogList";
