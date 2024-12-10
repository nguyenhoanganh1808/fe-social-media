import Avatar from "../../Avatar/Avatar";
import Post from "../PostsList/Post/Post";
import Comments from "./Comments/Comments";
import styles from "./PostDetail.module.css";

export default function PostDetail() {
  const postDetail = {
    userImg:
      "https://cafefcdn.com/thumb_w/640/203337114487263232/2024/10/24/avatar1729758071101-17297580727161334032661.jpg",
    authorImage:
      "https://cafefcdn.com/thumb_w/640/203337114487263232/2024/10/24/avatar1729758071101-17297580727161334032661.jpg",
    authorName: "Elon Musk",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    images: [],
    likeCount: 241000,
    commentCount: 45,
    postTime: new Date("2024-10-24T08:30:00"),
  };
  return (
    <div className={styles.container}>
      <Post post={postDetail} />
      <hr />
      <div className={styles.commentContainer}>
        <Avatar src={postDetail.userImg} size={40} />
        <input
          className={styles.commentInput}
          placeholder="Write your comment.."
          type="text"
        />
      </div>
      <Comments />
    </div>
  );
}
