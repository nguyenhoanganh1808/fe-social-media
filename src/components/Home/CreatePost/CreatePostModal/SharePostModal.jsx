import styles from "./CreatePostModal.module.css";
import { forwardRef } from "react";
import PropTypes from "prop-types";
import { Smile } from "lucide-react";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import Header from "../Header/Header";

import { FormProvider } from "react-hook-form";

import SelectPrivacy from "./SelectPrivacy";
import LoadingButton from "../../../common/Spinner/LoadingButton";
import { useAuth } from "../../../../hooks/useAuthContext";
import useFormSharePost from "../../../../hooks/useFormSharePost";

const SharePostModal = forwardRef(function UpdatePostModal(
  { closeDialog, postData },
  ref
) {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    emojiPickerVisible,
    onSubmit,
    methods,
    toggleEmojiPicker,
    handleEmojiClick,
    isDisable,
    loading,
  } = useFormSharePost(postData, closeDialog);

  return (
    <dialog className={styles.wrapper} ref={ref} aria-label="Edit Post">
      <Header closeDialog={closeDialog} title="Share" />

      <hr />
      <FormProvider {...methods}>
        <form
          className={styles.formContainer}
          onSubmit={handleSubmit(onSubmit)}
        >
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
                placeholder="Say something about this (optional)"
                name="content"
                id="content"
                cols={30}
                rows={2}
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
            </div>

            <LoadingButton
              type="submit"
              disabled={isDisable}
              isLoading={loading}
            >
              Share
            </LoadingButton>
          </div>
        </form>
      </FormProvider>
    </dialog>
  );
});

SharePostModal.propTypes = {
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

export default SharePostModal;
