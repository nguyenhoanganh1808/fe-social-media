import PostsList from "../Home/PostsList/PostsList";
import useFetchPost from "../../hooks/useFetchPosts";
import { PostService } from "../../services/post.service";
import CreatePostInGroup from "./CreatePostInGroup";
import { useParams } from "react-router-dom";

export default function Disussion() {
  const { id } = useParams();
  const {
    posts,
    loading,
    handlePostDeleted,
    handlePostUpdated,
    handlePostCreated,
  } = useFetchPost(PostService.getPostInGroup, id);

  return (
    <>
      <CreatePostInGroup handlePostCreated={handlePostCreated} />
      <PostsList
        posts={posts}
        loading={loading}
        handlePostDeleted={handlePostDeleted}
        handlePostUpdated={handlePostUpdated}
      />
    </>
  );
}
