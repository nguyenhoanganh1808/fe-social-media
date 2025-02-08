import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PostService } from "../services/post.service";
import createPost from "../models/post";

export default function useFetchPost(fetchFunction, id = 0) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10;

  const fetchMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextPage = page + 1;
    try {
      const postData = await fetchFunction(nextPage, pageSize, id);

      setPosts((prevPosts) => [...prevPosts, ...postData]);

      setPage(nextPage);
      setHasMore(postData.length === pageSize);
    } catch (e) {
      toast.error(e.message || "An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [fetchFunction, id, hasMore, loading, page]);

  useEffect(() => {
    async function fetch() {
      const postData = await fetchFunction(0, pageSize, id);
      setPosts(postData);
      setLoading(false);
    }
    fetch();
  }, [fetchFunction, id]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1
      ) {
        fetchMorePosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchMorePosts]);

  const handlePostDeleted = async (postId) => {
    try {
      await PostService.deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      toast.success("Post deleted successfully");
    } catch (e) {
      toast.error(e.message || "Failed to delete post");
    }
  };

  const handlePostCreated = (data) => {
    const newPost = createPost(data);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const handlePostUpdated = async (postId, newContent) => {
    setLoading(true);

    const result = await PostService.updatePost(postId, newContent);
    console.log("newContent: ", newContent);
    if (result.success) {
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === postId ? result.data : post))
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
  };
}
