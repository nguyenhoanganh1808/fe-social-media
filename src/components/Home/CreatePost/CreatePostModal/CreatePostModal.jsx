import { forwardRef, useState } from "react";
import styles from "./CreatePostModal.module.css";
import PropTypes from "prop-types";
import { Smile, FilesIcon, Link, X, ArrowLeft } from "lucide-react";
import AddImageOrVideoInput from "./AddImageOrVideo/AddImageOrVideoInput";
import AddLinks from "./AddLinks/AddLinks";
import useToggle from "../../../../hooks/useToggle";
import { useAuth } from "../../../../contexts/auth/useAuthContext";
import GifPicker from "gif-picker-react";
import LucideCircleButton from "../../../Button/LucideCircleButton/LucideCircleButton";
import EmojiPicker from "emoji-picker-react";

const CreatePostModal = forwardRef(function CreatePostModal(
  { closeDialog },
  ref
) {
  const [postContent, setPostContent] = useState("");
  const { user } = useAuth();
  const {
    isOpen: addImageFormVisible,
    close: closeAddImageForm,
    toggle: toggleAddImageForm,
  } = useToggle();
  const { isOpen: addLinkFormVisible, toggle: toggleAddLinkForm } = useToggle();
  const {
    isOpen: addGifPickerVisible,
    toggle: toggleGifPicker,
    close: closeGifPicker,
  } = useToggle();
  const { isOpen: emojiPickerVisible, toggle: toggleEmojiPicker } = useToggle();

  return (
    <dialog className={styles.wrapper} ref={ref}>
      {emojiPickerVisible && (
        <div className={styles.emojiPicker}>
          <EmojiPicker />
        </div>
      )}
      <div className={styles.header}>
        {addGifPickerVisible && (
          <LucideCircleButton
            color="#e2e5e9"
            size={45}
            onClick={closeGifPicker}
          >
            <ArrowLeft color="#1c1e21" />
          </LucideCircleButton>
        )}
        <h1>{addGifPickerVisible ? "Choose a GIF" : "Create Post"}</h1>
        <X
          onClick={closeDialog}
          className={styles.closeBtn}
          size={40}
          color="#ccc"
        />
      </div>
      <hr />
      {!addGifPickerVisible ? (
        <div className={styles.contentContainer}>
          <div className={styles.avatarContainer}>
            <img className={styles.avatar} src={user.avatarUrl} alt="" />
            <div>
              <p className={styles.link}>@{user.tagName}</p>
              <p className={styles.name}>{user.nickName}</p>
            </div>
          </div>
          <textarea
            className={styles.contentInput}
            placeholder={`What's on your mind, ${user.nickName}`}
            name="content"
            id="content"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            cols={35}
            rows={addImageFormVisible ? 1 : 5}
          ></textarea>

          <Smile
            onClick={toggleEmojiPicker}
            className={styles.icon}
            color="#ccc"
            size={30}
          />
          {addImageFormVisible && (
            <AddImageOrVideoInput onClose={closeAddImageForm} />
          )}

          {addLinkFormVisible && <AddLinks />}
          <div className={styles.addToPost}>
            <p>Add to your post</p>
            <div className={styles.buttons}>
              <div>
                <img
                  className={styles.addImage}
                  onClick={toggleAddImageForm}
                  src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png"
                  alt="Add image"
                />
              </div>
              <div>
                <FilesIcon color="blue" size={30} />
              </div>
              <div>
                <Link onClick={toggleAddLinkForm} color="red" size={30} />
              </div>

              <div className={styles.gifPickerContainer}>
                <div className={styles.gifContainer}></div>
                <img
                  className={styles.addImage}
                  onClick={toggleGifPicker}
                  src="https://static.xx.fbcdn.net/rsrc.php/v4/yT/r/q7MiRkL7MLC.png"
                  alt="Add image"
                />
              </div>
            </div>
          </div>
          <button
            className={
              postContent !== "" ? styles.submitBtn : styles.btnDeactive
            }
          >
            Post
          </button>
        </div>
      ) : (
        <div className={styles.gifPickerContainer}>
          <GifPicker
            width={550}
            tenorApiKey={import.meta.env.VITE_TENSOR_API_KEY}
          />
        </div>
      )}
    </dialog>
  );
});

CreatePostModal.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  closeDialog: PropTypes.func,
};

export default CreatePostModal;
