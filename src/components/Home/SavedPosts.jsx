import useFetchPost from "../../hooks/useFetchPosts";
import { PostService } from "../../services/post.service";
import PostsList from "./PostsList/PostsList";

export default function SavedPosts() {
  const { posts, loading, handlePostDeleted, handlePostUpdated } = useFetchPost(
    PostService.getSavedPost
  );

  return (
    <div className="w-full max-w-4xl">
      <PostsList
        posts={posts}
        loading={loading}
        handlePostDeleted={handlePostDeleted}
        handlePostUpdated={handlePostUpdated}
      />
    </div>
  );
}
