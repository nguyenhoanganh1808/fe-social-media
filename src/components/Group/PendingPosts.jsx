import { useParams } from "react-router-dom";
import { GroupService } from "../../services/group.service";

import useFethcInfinityData from "../../hooks/useFetchInfinityData";
import { useCallback } from "react";
import PostsListPending from "./PostsListPending";
import { PostService } from "../../services/post.service";

export default function PendingPosts() {
  const { id } = useParams();

  const fetchPendingPosts = useCallback(
    async (page, pageSize) =>
      await GroupService.getPendingPosts(page, pageSize, id),
    [id] // Recreate the function only if `id` changes
  );
  const {
    data: posts,
    loading,
    setData,
  } = useFethcInfinityData(fetchPendingPosts);
  const approvePost = async (postId) => {
    const result = await PostService.reviewPost(postId, true);
    if (result.success) {
      console.log("Post approved");
      setData((prevData) => prevData.filter((post) => post.id !== postId));
    } else {
      console.error("Failed to approve post");
    }
  };

  const denyPost = async (postId) => {
    const result = await PostService.reviewPost(postId, false);
    if (result.success) {
      console.log("Post denied");
      setData((prevData) => prevData.filter((post) => post.id !== postId));
    } else {
      console.error("Failed to deny post");
    }
  };
  console.log("posts: ", posts);

  return (
    <PostsListPending
      posts={posts}
      loading={loading}
      onApprove={approvePost}
      onDeny={denyPost}
    />
  );
}
