import { useParams } from "react-router-dom";
import useFetchPost from "../../hooks/useFetchPosts";
import { PostService } from "../../services/post.service";
import PostsList from "./PostsList/PostsList";

export default function CategoriesPost() {
  const { filterId } = useParams();
  const { posts, loading, handlePostDeleted, handlePostUpdated } = useFetchPost(
    PostService.getFeedByFilterId,
    filterId
  );

  return (
    <PostsList
      posts={posts}
      loading={loading}
      handlePostDeleted={handlePostDeleted}
      handlePostUpdated={handlePostUpdated}
    />
  );
}
