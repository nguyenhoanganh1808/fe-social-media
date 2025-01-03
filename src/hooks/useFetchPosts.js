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
      setPosts([]);
      setPosts((prevPosts) => {
        const postMap = new Map(prevPosts.map((post) => [post.id, post]));
        postData.forEach((newPost) => {
          if (!postMap.has(newPost.id)) {
            postMap.set(newPost.id, newPost);
          }
        });
        return Array.from(postMap.values());
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
    setPage(0);
    setHasMore(true);
  }, [revalidate]);

  useEffect(() => {
    if (page === 0 && hasMore) {
      fetchPosts();
    }
  }, [page, hasMore, fetchPosts]);

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

  const handlePostCreated = async () => {
    setPage(0);
    setHasMore(true);
  };

  const handlePostUpdated = async (postId, newContent) => {
    setLoading(true);

    const result = await PostService.updatePost(postId, newContent);
    console.log("newContent: ", newContent);
    if (result.success) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? {
                ...post,
                textContent: newContent.content,
                mediaFiles: newContent.mediaFiles ? newContent.mediaFiles : [],
              }
            : post
        )
      );
    }
    setLoading(false);
    return result;
  };

  return {
    posts,
    loading,
    handlePostCreated,
    handlePostDeleted,
    handlePostUpdated,
    toggleValidation,
  };
}
