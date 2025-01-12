import { useEffect, useState } from "react";
import { useAuth } from "./useAuthContext";
import { useForm } from "react-hook-form";
import useToggle from "./useToggle";
import { toast } from "react-toastify";
import { convertToFiles } from "../lib/utils";

export default function useFormUpdatePost(
  postData,
  handlePostUpdated,
  closeDialog
) {
  const [gif, setGif] = useState(postData?.gifUrl || null);
  const { user } = useAuth();

  const methods = useForm({
    defaultValues: {
      content: postData?.textContent || "",
      file: null,
      privacy: postData.isPrivate ? 2 : 1,
    },
  });

  const { register, handleSubmit, setValue, getValues, watch } = methods;
  const [loading, setLoading] = useState(false);
  const {
    isOpen: addImageFormVisible,
    close: closeAddImageForm,
    toggle: toggleAddImageForm,
  } = useToggle(
    postData.mediaFiles.length > 0 &&
      postData.mediaFiles[0].type !== "DOCUMENT" &&
      postData.mediaFiles[0].type !== "OTHER"
      ? true
      : false
  );

  const { isOpen: addLinkFormVisible, open: openAddLinkForm } = useToggle();
  const {
    isOpen: addGifPickerVisible,
    open: openGifPreview,
    toggle: toggleGifPicker,
    close: closeGifPicker,
  } = useToggle();
  const { isOpen: emojiPickerVisible, toggle: toggleEmojiPicker } = useToggle();

  const files = watch("file");
  const images = watch("mediaFiles");
  const postContent = watch("content");
  const fileArray = files instanceof FileList ? Array.from(files) : [];
  const imagesArray = images instanceof FileList ? Array.from(images) : [];

  const handleEmojiClick = (emoji) => {
    setValue("content", getValues("content") + emoji.native);
  };

  const handleRemoveFile = (index) => {
    console.log("index: ", index);
    console.log("fileArray: ", fileArray);
    console.log("files: ", files);
    const updatedFiles = files.filter((_, i) => i !== index);

    setValue("file", updatedFiles);
  };

  const handleGifSelect = (gif) => {
    if (gif) {
      setGif(gif.preview.url);
      openGifPreview();
      closeGifPicker();
    }
  };

  const onSubmit = async (data) => {
    if (!data.content && !data.file && !gif) {
      toast.error(
        "Please add content, a file, or a GIF before updating the post."
      );
      return;
    }
    setLoading(true);

    const result = await handlePostUpdated(postData.id, data);
    console.log("res: ", result);
    if (result.success) {
      closeDialog();
      setLoading(false);
    }
  };
  useEffect(() => {
    setValue("content", postData?.textContent || "");

    if (
      postData.mediaFiles.length > 0 &&
      (postData.mediaFiles[0].type === "DOCUMENT" ||
        postData.mediaFiles[0].type === "OTHER")
    ) {
      convertToFiles(postData.mediaFiles).then((files) => {
        setValue("file", files);
      });
    }
  }, [postData, setValue]);

  return {
    methods,
    loading,
    onSubmit,
    addImageFormVisible,
    closeAddImageForm,
    toggleAddImageForm,

    openGifPreview,
    openAddLinkForm,
    gif,
    handleGifSelect,
    handleEmojiClick,
    addLinkFormVisible,
    images,
    addGifPickerVisible,
    toggleGifPicker,
    emojiPickerVisible,
    toggleEmojiPicker,
    user,
    register,
    handleSubmit,
    closeGifPicker,
    handleRemoveFile,
    fileArray,
    imagesArray,
    files,
    postContent,
  };
}
