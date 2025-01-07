import useFetchPost from "../../hooks/useFetchPosts";
import { PostService } from "../../services/post.service";
import CreatePost from "../Home/CreatePost/CreatePost";
import PostsList from "../Home/PostsList/PostsList";
import Intro from "./Intro/Intro";
import Skill from "./Skills/Skills";
import styles from "../../pages/Profile/ProfilePage.module.css";
import { useOutletContext, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext";

export default function UserPosts() {
  const { posts, loading } = useFetchPost(PostService.getUserPosts);
  const { id } = useParams();
  const { user } = useAuth();
  const { userInfo } = useOutletContext();

  return (
    <div className="container flex flex-col gap-3 lg:flex-row justify-center">
      <div className={styles.leftDownContainer}>
        <Intro userInfo={userInfo} />
        <Skill userInfo={userInfo} />
      </div>
      <div className={styles.rightDownContainer}>
        {id === user.userId && <CreatePost />}
        <PostsList posts={posts} loading={loading} />
      </div>
    </div>
  );
}
