import InteractionBar from "./InteractionBar/InteractionBar";
import styles from "./Post.module.css";
import PropTypes from "prop-types";
import { formatDistanceToNowStrict } from "date-fns";
import InteractionButton from "../../../Button/InteractionButton/InteractionButton";
import { Bookmark, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";
import Avatar from "../../../Avatar/Avatar";
import useToggle from "../../../../hooks/useToggle";
import { Pencil, Trash2 } from "lucide-react";
import UpdatePostModal from "../../CreatePost/CreatePostModal/UpdatePostModal";
import useDialog from "../../../../hooks/useDialog";
import { useState } from "react";
import { PostService } from "../../../../services/post.service";
import { CustomCarousel } from "../../CreatePost/CreatePostModal/CustomSlider/Carousel";
import FileView from "./FileView";
import { useAuth } from "../../../../hooks/useAuthContext";

const actionsButton = [
  {
    icon: Pencil,
    title: "Edit",
    color: "var(--icon-color)",
  },
  {
    icon: Trash2,
    color: "red",
    title: "Delete",
  },
];

function Post({ post, handlePostDeleted, handlePostUpdated }) {
  const { isOpen, toggle } = useToggle();
  const { closeDialog, dialogRef, showDialog } = useDialog();
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const { user } = useAuth();
  const distanceFromNow = formatDistanceToNowStrict(post.createdAt);
  const isAuthor = user.userId === post.user.id;

  const toggleSaved = async () => {
    setIsSaved((prevIsSaved) => !prevIsSaved);
    let result;
    if (isSaved) {
      result = await PostService.unSavePost(post.id);
    } else {
      result = await PostService.savePost(post.id);
    }
    if (result.error) {
      setIsSaved((prevIsSaved) => !prevIsSaved);
    }
  };

  return (
    <div className={styles.wrapper}>
      <UpdatePostModal
        ref={dialogRef}
        closeDialog={closeDialog}
        handlePostUpdated={handlePostUpdated}
        postData={post}
      />
      <div className="mt-3">
        <Avatar src={post.user.avatarUrl} size={40} />
      </div>
      <div className={styles.container}>
        <Link className={styles.link} to={`/posts/${post.id}`}>
          <div className={styles.authorAndTime}>
            <div>
              <p className={styles.author}>{post.user.username}</p>
              <p className={styles.time}>{distanceFromNow} ago</p>
            </div>

            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle();
              }}
            >
              {isAuthor && (
                <div className={styles.ellipsis}>
                  <Ellipsis />
                </div>
              )}
              {isOpen && (
                <div className={styles.actionsContainer}>
                  <ul>
                    {actionsButton.map((action) => (
                      <li className={styles.buttons} key={action.title}>
                        <button
                          style={{ color: action.color }}
                          onClick={() => {
                            if (action.title === "Edit") {
                              showDialog();
                            } else {
                              handlePostDeleted(post.id);
                            }
                          }}
                        >
                          <action.icon />
                          {action.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <p>{post.textContent}</p>
          <ul>
            {post &&
            post.mediaFiles.length > 0 &&
            post.mediaFiles[0].type !== "DOCUMENT" ? (
              <CustomCarousel medias={post.mediaFiles} />
            ) : (
              post.mediaFiles.map((file) => <FileView key={file.url} />)
            )}
          </ul>
        </Link>
        <div className={styles.interactionContainer}>
          <InteractionBar post={post} />
          <InteractionButton
            onClick={toggleSaved}
            count={null}
            icon={<Bookmark color="null" fill={isSaved ? "#84CBF3" : "gray"} />}
          />
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    textContent: PropTypes.string,
    title: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string,
      avatarUrl: PropTypes.string.isRequired,
    }),
    mediaFiles: PropTypes.array,
    createdAt: PropTypes.string,
    isSaved: PropTypes.bool,
    reactionCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
  }),
  handlePostDeleted: PropTypes.func,
  handlePostUpdated: PropTypes.func,
};

export default Post;
