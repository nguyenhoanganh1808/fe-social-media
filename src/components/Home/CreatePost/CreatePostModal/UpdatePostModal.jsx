import styles from "./CreatePostModal.module.css";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Smile, FilesIcon, Link } from "lucide-react";
import AddImageOrVideoInput from "./AddImageOrVideo/AddImageOrVideoInput";
import AddLinks from "./AddLinks/AddLinks";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Header from "../Header/Header";

import { FormProvider } from "react-hook-form";
import GifPicker from "gif-picker-react";
import GifPreview from "./GifPreview/GifPreview";

import useFormUpdatePost from "../../../../hooks/useFormUpdatePost";
import FilePreview from "./FilePreview/FilePreview";
import SelectPrivacy from "./SelectPrivacy";
import LoadingButton from "../../../common/Spinner/LoadingButton";

const UpdatePostModal = forwardRef(function UpdatePostModal(
  { closeDialog, postData, handlePostUpdated },
  ref
) {
  const {
    addGifPickerVisible,
    addImageFormVisible,
    addLinkFormVisible,
    closeAddImageForm,
    closeGifPreview,
    emojiPickerVisible,
    gif,
    gifPreviewVisible,
    handleEmojiClick,
    handleGifSelect,
    handleSubmit,
    loading,
    methods,
    onSubmit,
    register,
    openAddImageForm,
    user,
    toggleEmojiPicker,

    openAddLinkForm,

    openGifPreview,

    images,

    files,

    handleRemoveFile,
    closeGifPicker,
  } = useFormUpdatePost(postData, handlePostUpdated, closeDialog);

  console.log("images: ", images);

  return (
    <dialog className={styles.wrapper} ref={ref} aria-label="Edit Post">
      <Header
        addGifPickerVisible={addGifPickerVisible}
        closeDialog={closeDialog}
        closeGifPicker={closeGifPicker}
        title="Edit Post"
      />

      <hr />
      <FormProvider {...methods}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
          {!addGifPickerVisible ? (
            <div className={styles.postContainer}>
              <div className={styles.contentContainer}>
                <div className={styles.avatarContainer}>
                  <img className={styles.avatar} src={user.avatarUrl} alt="" />
                  <div>
                    <p className={styles.link}>@{user.tagName}</p>
                    <p className={styles.name}>{user.nickName}</p>
                    <SelectPrivacy />
                  </div>
                </div>
                <textarea
                  {...register("content")}
                  className={`${styles.contentInput} border-transparent focus:border-transparent focus:ring-0`}
                  placeholder={`Edit your post, ${user.nickName}`}
                  name="content"
                  id="content"
                  cols={30}
                  rows={addImageFormVisible ? 2 : 5}
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

                <FilePreview files={files} onRemove={handleRemoveFile} />

                {gifPreviewVisible && (
                  <GifPreview gifUrl={gif} onClose={closeGifPreview} />
                )}

                {addImageFormVisible && (
                  <AddImageOrVideoInput
                    onClose={closeAddImageForm}
                    defaultFiles={
                      postData.mediaFiles.length > 0 &&
                      postData.mediaFiles[0]?.type !== "DOCUMENT" &&
                      postData.mediaFiles[0]?.type !== "OTHER"
                        ? postData.mediaFiles
                        : []
                    }
                  />
                )}

                {addLinkFormVisible && <AddLinks />}
              </div>
              <div className={styles.addToPost}>
                <p>Edit your post</p>
                <div className={styles.buttons}>
                  <div>
                    <img
                      className={`${styles.addImage} ${
                        files && files.length > 0
                          ? "opacity-40 cursor-not-allowed"
                          : ""
                      }`}
                      onClick={() => {
                        if (files && files.length <= 0) {
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
                      onClick={openGifPreview}
                      src="https://static.xx.fbcdn.net/rsrc.php/v4/yT/r/q7MiRkL7MLC.png"
                      alt="Add GIF"
                    />
                  </div>
                </div>
              </div>
              <LoadingButton
                type="submit"
                disabled={
                  (!postData.textContent && postData.mediaFiles.length === 0) ||
                  loading
                }
                isLoading={loading}
              >
                Update
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

UpdatePostModal.propTypes = {
  postData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    textContent: PropTypes.string,
    gifUrl: PropTypes.string,
    mediaFiles: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }),
  closeDialog: PropTypes.func,
  handlePostUpdated: PropTypes.func,
};

export default UpdatePostModal;
