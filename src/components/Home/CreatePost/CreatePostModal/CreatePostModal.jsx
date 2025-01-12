import { forwardRef, useState } from "react";
import styles from "./CreatePostModal.module.css";
import PropTypes from "prop-types";
import { Smile, FilesIcon, Link } from "lucide-react";
import AddImageOrVideoInput from "./AddImageOrVideo/AddImageOrVideoInput";
import AddLinks from "./AddLinks/AddLinks";
import useToggle from "../../../../hooks/useToggle";
import { useAuth } from "../../../../hooks/useAuthContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Header from "../Header/Header";

import useFormCreatePost from "../../../../hooks/useFormCreatePost";
import { FormProvider } from "react-hook-form";
import FilePreview from "./FilePreview/FilePreview";

import GifPreview from "../CreatePostModal/GifPreview/GifPreview";
import GifPicker from "gif-picker-react";
import SelectPrivacy from "./SelectPrivacy";
import LoadingButton from "../../../common/Spinner/LoadingButton";

const CreatePostModal = forwardRef(function CreatePostModal(
  { closeDialog, handlePostCreated },
  ref
) {
  const {
    methods,
    onSubmit,
    fileArray,
    images,
    loading,
    isButtonNotDisabled,
    handleRemoveFile,
    setLoading,
    resetMediaArray,
    resetFileArray,
  } = useFormCreatePost();
  const { register, handleSubmit, setValue, getValues, reset } = methods;

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

  console.log("imagesarray: ", images);

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
            const result = await onSubmit(data);
            if (result.success) {
              // await handlePostCreated();
              handlePostCreated(result.data);
              setLoading(false);
              reset();
              closeDialog();
              resetMediaArray();
              resetFileArray();
            }
            // toggleValidation();
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
                {<FilePreview files={fileArray} onRemove={handleRemoveFile} />}

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
                      className={`${styles.addImage} ${
                        fileArray.length > 0
                          ? "opacity-40 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => {
                        if (fileArray.length <= 0) {
                          openAddImageForm();
                        }
                      }}
                      src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png"
                      alt="Add image"
                    />
                  </div>
                  <label
                    className={
                      images && images.length > 0 ? "cursor-not-allowed" : ""
                    }
                    onClick={(e) => {
                      if (images && images.length > 0) {
                        e.preventDefault();
                      }
                    }}
                    htmlFor="file"
                  >
                    <FilesIcon
                      color={images && images.length > 0 ? "gray" : "blue"}
                      size={30}
                    />
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

CreatePostModal.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  closeDialog: PropTypes.func,
  toggleValidation: PropTypes.func,
  handlePostCreated: PropTypes.func,
};

export default CreatePostModal;
