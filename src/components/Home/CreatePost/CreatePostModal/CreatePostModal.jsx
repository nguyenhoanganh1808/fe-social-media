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
import Spinner from "../../../common/Spinner/Spinner";

import GifPreview from "../CreatePostModal/GifPreview/GifPreview";
import GifPicker from "gif-picker-react";
import SelectPrivacy from "./SelectPrivacy";

const CreatePostModal = forwardRef(function CreatePostModal(
  { closeDialog, toggleValidation },
  ref
) {
  const {
    methods,
    onSubmit,
    fileArray,
    imagesArray,
    postContent,
    loading,
    handleRemoveFile,
  } = useFormCreatePost();
  const { register, handleSubmit, setValue, getValues, reset } = methods;
  const [option, setOption] = useState("text");

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
  const {
    isOpen: addLinkFormVisible,
    open: openAddLinkForm,
    close: closeAddLinkForm,
  } = useToggle();
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
          onSubmit={handleSubmit(async (data) => {
            await onSubmit(data);
            toggleValidation();
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
                  className={styles.contentInput}
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
                        setOption("media");
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
              <button
                type="submit"
                disabled={loading}
                className={`${
                  postContent !== "" ||
                  fileArray.length > 0 ||
                  imagesArray.length > 0
                    ? styles.submitBtn
                    : styles.btnDeactive
                } rounded-md`}
                // onClick={handlePostSubmit}
              >
                {loading ? <Spinner borderWidth={3} size={30} /> : "Post"}
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

CreatePostModal.propTypes = {
  author: PropTypes.shape({
    avatarUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  closeDialog: PropTypes.func,
  toggleValidation: PropTypes.func,
};

export default CreatePostModal;
