import { forwardRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./CreatePostModal.module.css";
import { Smile, FilesIcon, Link } from "lucide-react";
import AddImageOrVideoInput from "./AddImageOrVideo/AddImageOrVideoInput";
import AddLinks from "./AddLinks/AddLinks";
import useToggle from "../../../../hooks/useToggle";
import { useAuth } from "../../../../hooks/useAuthContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Header from "../Header/Header";

import { FormProvider, useForm } from "react-hook-form";
import FilePreview from "./FilePreview/FilePreview";

import GifPicker from "gif-picker-react";
import GifPreview from "./GifPreview/GifPreview";
import Spinner from "../../../common/Spinner/Spinner";

const UpdatePostModal = forwardRef(function UpdatePostModal(
  { closeDialog, postData, handlePostUpdated },
  ref
) {
  const [gif, setGif] = useState(postData?.gifUrl || null);
  const { user } = useAuth();

  const methods = useForm({
    defaultValues: {
      content: postData?.textContent || "",
      file: null,
    },
  });

  const { register, handleSubmit, setValue, getValues } = methods;
  const [loading, setLoading] = useState(false);
  const {
    isOpen: addImageFormVisible,
    close: closeAddImageForm,
    toggle: toggleAddImageForm,
  } = useToggle(postData.mediaFiles !== null ? true : false);
  const {
    isOpen: gifPreviewVisible,
    open: openGifPreview,
    close: closeGifPreview,
  } = useToggle();
  const { isOpen: addLinkFormVisible, toggle: toggleAddLinkForm } = useToggle();
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

  const handleRemoveFile = (fileIndex) => {
    const updatedFiles = [...postData.mediaFiles];
    updatedFiles.splice(fileIndex, 1);
    setValue("files", updatedFiles);
  };

  const onSubmit = async (data) => {
    const updatedData = {
      ...data,
      // gifUrl: gif,
    };
    setLoading(true);
    await handlePostUpdated(postData.id, updatedData);
    setLoading(false);
    closeDialog();
  };

  useEffect(() => {
    setValue("content", postData?.textContent || "");
  }, [postData, setValue]);

  return (
    <dialog className={styles.wrapper} ref={ref}>
      <Header
        addGifPickerVisible={addGifPickerVisible}
        closeDialog={closeDialog}
        closeGifPicker={closeGifPicker}
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
                  </div>
                </div>
                <textarea
                  {...register("content")}
                  className={styles.contentInput}
                  placeholder={`Edit your post, ${user.nickName}`}
                  name="content"
                  id="content"
                  cols={34}
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
                <FilePreview
                  files={postData.mediaFiles}
                  onRemove={handleRemoveFile}
                />

                {addImageFormVisible && (
                  <AddImageOrVideoInput
                    onClose={closeAddImageForm}
                    defaultFiles={postData.mediaFiles}
                  />
                )}

                {addLinkFormVisible && <AddLinks />}
              </div>
              <div className={styles.addToPost}>
                <p>Edit your post</p>
                <div className={styles.buttons}>
                  <div>
                    <img
                      className={styles.addImage}
                      onClick={toggleAddImageForm}
                      src="https://static.xx.fbcdn.net/rsrc.php/v4/y7/r/Ivw7nhRtXyo.png"
                      alt="Add image"
                    />
                  </div>
                  <label htmlFor="file">
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
                    <Link onClick={toggleAddLinkForm} color="red" size={30} />
                  </div>

                  <div className={styles.gifPickerContainer}>
                    <div className={styles.gifContainer}></div>
                    <img
                      className={styles.addImage}
                      onClick={toggleGifPicker}
                      src="https://static.xx.fbcdn.net/rsrc.php/v4/yT/r/q7MiRkL7MLC.png"
                      alt="Add GIF"
                    />
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className={
                  postData.textContent !== "" || postData.mediaFiles.length > 0
                    ? styles.submitBtn
                    : styles.btnDeactive
                }
              >
                {loading ? <Spinner /> : "Update"}
              </button>
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
    id: PropTypes.string.isRequired,
    textContent: PropTypes.string,
    gifUrl: PropTypes.string,
    mediaFiles: PropTypes.arrayOf(PropTypes.object),
  }),
  closeDialog: PropTypes.func,
  toggleValidation: PropTypes.func,
  handlePostUpdated: PropTypes.func,
};

export default UpdatePostModal;
