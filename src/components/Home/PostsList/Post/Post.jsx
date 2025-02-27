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
import FileView from "./FileView";
import { useAuth } from "../../../../hooks/useAuthContext";
import Private from "./Private";
import Public from "./Public";
import SharePostModal from "../../CreatePost/CreatePostModal/SharePostModal";
import { UserPopOver } from "../../../common/UserPopOver";
import { CarouselComponent } from "./Carousel";
import Badges from "../../../common/Badges";
import ReportButton from "./ReportButton";
import { createUserProfile } from "../../../../lib/utils";

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

function Post({
  post,
  handlePostDeleted,
  handlePostUpdated,
  isShowInteractive = true,
}) {
  const { isOpen, toggle } = useToggle();
  const { closeDialog, dialogRef, showDialog } = useDialog();
  const {
    closeDialog: closeShare,
    dialogRef: shareRef,
    showDialog: showShare,
  } = useDialog();
  const [isSaved, setIsSaved] = useState(post.isSaved);
  const { user } = useAuth();
  const distanceFromNow = formatDistanceToNowStrict(post.createdAt);
  const isAuthor = user.userId === post.user.id;
  const author = createUserProfile(post.user);

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
      <SharePostModal ref={shareRef} closeDialog={closeShare} postData={post} />
      <UpdatePostModal
        ref={dialogRef}
        closeDialog={closeDialog}
        handlePostUpdated={handlePostUpdated}
        postData={post}
      />
      <div className="mt-3">
        <Avatar src={author.avatarUrl} size={40} />
      </div>
      <div className={styles.container}>
        <Link className={styles.link} to={`/posts/${post.id}`}>
          <div className={`${styles.authorAndTime}  `}>
            <div className="flex md:flex-row flex-col md:items-center items-start ">
              <UserPopOver
                user={{
                  ...author,
                  nickname: author.nickName,
                }}
              >
                <p className={`${styles.author} hover:text-indigo-500 z-10`}>
                  {author.nickName}
                </p>
              </UserPopOver>
              <p className={`${styles.time}`}>{distanceFromNow} ago</p>
              {post.isPrivate ? <Private /> : <Public />}
              {post.group && (
                <div className="">
                  <span>posted in </span>
                  <Link
                    to={`/groups/${post.group?.id}`}
                    className="text-gray-500 hover:text-indigo-500 truncate mb-auto hover:underline"
                  >
                    {post.group.name}
                  </Link>
                </div>
              )}
            </div>

            <div
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle();
              }}
            >
              <div className={styles.ellipsis}>
                <Ellipsis />
              </div>

              {isOpen && (
                <div className={styles.actionsContainer}>
                  <ul>
                    {isAuthor &&
                      actionsButton.map((action) => (
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
                    {!isAuthor && (
                      <li className={`${styles.buttons} rounded-md`}>
                        <ReportButton postId={post.id} />
                      </li>
                    )}
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
              <CarouselComponent medias={post.mediaFiles} />
            ) : (
              post.mediaFiles.map((file) => (
                <FileView key={file.url} file={file} />
              ))
            )}
          </ul>
        </Link>
        {post.sharedPost && (
          <Post post={post.sharedPost} isShowInteractive={false} />
        )}
        {post.topics && post.topics.length > 0 && (
          <div className={styles.topicContainer}>
            {post.topics.map((topic) => (
              <Badges key={topic} text={topic} />
            ))}
          </div>
        )}
        {isShowInteractive && (
          <div className={styles.interactionContainer}>
            <InteractionBar post={post} onClickShare={showShare} />
            <InteractionButton
              onClick={toggleSaved}
              count={null}
              icon={
                <Bookmark color="null" fill={isSaved ? "#84CBF3" : "gray"} />
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

Post.propTypes = {
  isShowInteractive: PropTypes.bool,
  post: PropTypes.shape({
    id: PropTypes.number,
    group: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    textContent: PropTypes.string,
    topics: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    sharedPost: PropTypes.object,
    user: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string,

      role: PropTypes.string.isRequired,
      lecturer: PropTypes.object,
      student: PropTypes.object,
    }),
    mediaFiles: PropTypes.array,
    createdAt: PropTypes.string,
    isSaved: PropTypes.bool,
    reactionCount: PropTypes.number.isRequired,
    commentCount: PropTypes.number.isRequired,
    isPrivate: PropTypes.bool.isRequired,
  }),
  handlePostDeleted: PropTypes.func,
  handlePostUpdated: PropTypes.func,
};

export default Post;
