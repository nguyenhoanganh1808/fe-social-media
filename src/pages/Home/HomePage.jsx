import EmojiPicker from "emoji-picker-react";
import ActiveFriendList from "../../components/Home/ActiveFriendList/ActiveFriendList";
import Communities from "../../components/Home/Communities/Communities";
import CreatePost from "../../components/Home/CreatePost/CreatePost";
import PostsList from "../../components/Home/PostsList/PostsList";
import Suggest from "../../components/Home/Suggest/Suggest";
import UserCard from "../../components/Home/UserCard/UserCard";
import styles from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <div>
        <UserCard
          name="Bryan Nguyen"
          bio="Hello ,I’m UI / UX designer. Open to the new Project"
          followersNumber={1984}
          followingNumber={2003}
          link="@bryannguyen"
        />
        <Communities />
      </div>
      <div className={styles.postListContainer}>
        <CreatePost />
        <PostsList />
      </div>
      <div>
        <Suggest />
        <ActiveFriendList />
      </div>
    </main>
  );
}
