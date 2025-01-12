import { useForm } from "react-hook-form";
import useToggle from "./useToggle";
import { useState } from "react";
import { PostService } from "../services/post.service";

export default function useFormSharePost(postData, closeDialog) {
  const methods = useForm({
    defaultValues: {
      content: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, getValues, watch } = methods;

  const { isOpen: emojiPickerVisible, toggle: toggleEmojiPicker } = useToggle();

  const onSubmit = async (data) => {
    console.log("postdataafaw: ", postData);
    const shareData = {
      privacyId: parseInt(data.privacy),
      originalPostId: postData.id,
      title: "",
      additionalContent: data.content,
    };
    setLoading(true);
    const result = await PostService.sharePost(shareData);
    if (result.success) {
      closeDialog();
    }
    setLoading(false);
  };

  const handleEmojiClick = (emoji) => {
    setValue("content", getValues("content") + emoji.native);
  };

  const content = watch("content"); // Watch the content field for changes
  const isDisable = content.trim() === "" || loading;

  return {
    register,
    handleSubmit,
    onSubmit,
    isDisable,
    loading,
    emojiPickerVisible,
    toggleEmojiPicker,
    methods,
    handleEmojiClick,
  };
}
