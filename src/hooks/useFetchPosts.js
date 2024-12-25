import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PostService } from "../services/post.service";

export default function useFetchPost(fetchFunction) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [revalidate, setRevalidate] = useState(false);

  const toggleValidation = () => {
    setRevalidate((prev) => !prev);
  };

  const fetchPosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const postData = await fetchFunction(page, 10);
      setPosts((prevPosts) => {
        const postMap = new Map(prevPosts.map((post) => [post.id, post])); // Create a map of current posts
        postData.forEach((newPost) => {
          if (!postMap.has(newPost.id)) {
            postMap.set(newPost.id, newPost); // Add only unique posts
          }
        });
        return Array.from(postMap.values()); // Convert the map back to an array
      });

      setPage((prevPage) => prevPage + 1);
      if (postData.length < 10) {
        setHasMore(false);
      }
    } catch (e) {
      toast.error(e.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, fetchFunction]);

  useEffect(() => {
    setPosts([]);
    setPage(0);
    setHasMore(true);
  }, [revalidate]);

  useEffect(() => {
    if (page === 0 && posts.length === 0 && hasMore) {
      fetchPosts();
    }
  }, [page, posts.length, hasMore, fetchPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      fetchPosts();
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchPosts]);

  const handlePostDeleted = async (postId) => {
    try {
      await PostService.deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
    } catch (e) {
      toast.error(e.message || "Failed to delete post");
    }
  };

  const handlePostUpdated = async (postId, newContent) => {
    setLoading(true);
    try {
      await PostService.updatePost(postId, newContent);
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                textContent: newContent.content,
                mediaFiles: newContent.mediaFiles,
              }
            : post
        )
      );

      toast.success("Post edited successfully");
    } catch (e) {
      toast.error(e.message || "Failed to edit post");
    } finally {
      setLoading(false);
    }
  };

  return {
    posts,
    loading,
    handlePostDeleted,
    handlePostUpdated,
    toggleValidation,
  };
}
