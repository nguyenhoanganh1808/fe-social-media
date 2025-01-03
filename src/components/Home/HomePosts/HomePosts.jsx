import useFetchPost from "../../../hooks/useFetchPosts";
import { PostService } from "../../../services/post.service";
import CreatePost from "../CreatePost/CreatePost";
import PostsList from "../PostsList/PostsList";

export default function HomePosts() {
  const {
    posts,
    loading,
    handlePostDeleted,
    toggleValidation,
    handlePostUpdated,
    handlePostCreated,
  } = useFetchPost(PostService.getFeed);

  return (
    <>
      <CreatePost
        toggleValidation={toggleValidation}
        handlePostCreated={handlePostCreated}
      />
      <PostsList
        posts={posts}
        loading={loading}
        handlePostDeleted={handlePostDeleted}
        handlePostUpdated={handlePostUpdated}
      />
    </>
  );
}
