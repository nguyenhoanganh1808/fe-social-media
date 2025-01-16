import { forwardRef, useState } from "react";
import styles from "../Home/CreatePost/CreatePostModal/CreatePostModal.module.css";
import PropTypes from "prop-types";
import { Smile, FilesIcon, Link } from "lucide-react";
import useToggle from "../../hooks/useToggle";
import { useAuth } from "../../hooks/useAuthContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Header from "../Home/CreatePost/Header/Header";

import useFormCreatePost from "../../hooks/useFormCreatePost";
import { FormProvider } from "react-hook-form";
import FilePreview from "../Home/CreatePost/CreatePostModal/FilePreview/FilePreview";

import GifPreview from "../Home/CreatePost/CreatePostModal/GifPreview/GifPreview";
import GifPicker from "gif-picker-react";
import SelectPrivacy from "../Home/CreatePost/CreatePostModal/SelectPrivacy";
import AddImageOrVideoInput from "../Home/CreatePost/CreatePostModal/AddImageOrVideo/AddImageOrVideoInput";
import AddLinks from "../Home/CreatePost/CreatePostModal/AddLinks/AddLinks";
import { PostService } from "../../services/post.service";
import { useParams } from "react-router-dom";
import LoadingButton from "../common/Spinner/LoadingButton";

const CreatePostInGroupModal = forwardRef(function CreatePostInGroupModal(
  { closeDialog, handlePostCreated },
  ref
) {
  const {
    methods,
    fileArray,
    loading,
    handleRemoveFile,
    setLoading,
    isButtonNotDisabled,
    resetFileArray,
    resetMediaArray,
  } = useFormCreatePost(closeDialog);
  const { register, handleSubmit, setValue, getValues, reset } = methods;
  const { id } = useParams();

  const [gif, setGif] = useState(null);
  const { user } = useAuth();
  const {
    isOpen: addImageFormVisible,
    close: closeAddImageForm,
    open: openAddImageForm,
  } = useToggle();
  const {
    isOpen: gifPreviewVisible,
    open: openGifPreview,
    close: closeGifPreview,
  } = useToggle();
  const { isOpen: addLinkFormVisible, open: openAddLinkForm } = useToggle();
  const {
    isOpen: addGifPickerVisible,
    toggle: toggleGifPicker,
    close: closeGifPicker,
  } = useToggle();
  const { isOpen: emojiPickerVisible, toggle: toggleEmojiPicker } = useToggle();

  const handleEmojiClick = (emoji) => {
    setValue("content", getValues("content") + emoji.native);
  };

  const handleGifSelect = (gif) => {
    if (gif) {
      setGif(gif.preview.url);
      openGifPreview();
      closeGifPicker();
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const result = await PostService.createGroupPost(id, data);

    if (result.error) {
      return;
    } else {
      closeDialog();
      resetMediaArray();
      resetFileArray();
      setValue("content", "");
      setValue("topics", []);
    }
    setLoading(false);

    return result;
  };

  return (
    <dialog className={styles.wrapper} ref={ref}>
      <Header
        addGifPickerVisible={addGifPickerVisible}
        closeDialog={closeDialog}
        closeGifPicker={closeGifPicker}
        title="Create Post"
      />

      <hr />
      <FormProvider {...methods}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(async (data) => {
            console.log(data);
            const result = await onSubmit(data);
            if (result.success) {
              handlePostCreated(result.data);
            }
            setLoading(false);
            reset();
            closeDialog();
          })}
        >
          {!addGifPickerVisible ? (
            <div className={styles.postContainer}>
              <div className={styles.contentContainer}>
                <div className={styles.avatarContainer}>
                  <img className={styles.avatar} src={user.avatarUrl} alt="" />
                  <div>
                    <p className={styles.name}>{user.nickName}</p>
                    <SelectPrivacy />
                  </div>
                </div>
                <textarea
                  {...register("content")}
                  className={`${styles.contentInput} border-transparent focus:border-transparent focus:ring-0`}
                  placeholder={`What's on your mind, ${user.nickName}`}
                  name="content"
                  id="content"
                  cols={30}
                  rows={addImageFormVisible ? 1 : 5}
                ></textarea>
                <div className={styles.emojiPickerContainer}>
                  <Smile
                    onClick={toggleEmojiPicker}
                    className={styles.icon}
                    color="#ccc"
                    size={30}
                  />
                  {emojiPickerVisible && (
                    <div className={styles.emojiPicker}>
                      <Picker data={data} onEmojiSelect={handleEmojiClick} />
                    </div>
                  )}
                </div>

                {gifPreviewVisible && (
                  <GifPreview gifUrl={gif} onClose={closeGifPreview} />
                )}
                <FilePreview files={fileArray} onRemove={handleRemoveFile} />

                {addImageFormVisible && (
                  <AddImageOrVideoInput onClose={closeAddImageForm} />
                )}

                {addLinkFormVisible && <AddLinks />}
              </div>
              <div className={styles.addToPost}>
                <p>Add to your post</p>
                <div className={styles.buttons}>
                  <div>
                    <img
                      className={styles.addImage}
                      onClick={() => {
                        openAddImageForm();
                      }}
                      src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png"
                      alt="Add image"
                    />
                  </div>
                  <label
                    onClick={() => {
                      closeAddImageForm();
                    }}
                    htmlFor="file"
                  >
                    <FilesIcon color="blue" size={30} />
                  </label>
                  <input
                    {...register("file")}
                    type="file"
                    id="file"
                    multiple
                    style={{ display: "none" }}
                  />
                  <div>
                    <Link onClick={openAddLinkForm} color="red" size={30} />
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
              <LoadingButton
                type="submit"
                disabled={!isButtonNotDisabled || loading}
                isLoading={loading}
              >
                Post
              </LoadingButton>
            </div>
          ) : (
            <div className={styles.gifPickerContainer}>
              <GifPicker
                onGifClick={handleGifSelect}
                width={550}
                tenorApiKey={import.meta.env.VITE_TENSOR_API_KEY}
              />
            </div>
          )}
        </form>
      </FormProvider>
    </dialog>
  );
});

CreatePostInGroupModal.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  closeDialog: PropTypes.func,
  toggleValidation: PropTypes.func,
  handlePostCreated: PropTypes.func,
};

export default CreatePostInGroupModal;
