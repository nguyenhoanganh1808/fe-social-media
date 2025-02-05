import { useEffect, useState } from "react";
import { useAuth } from "./useAuthContext";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { convertToFiles } from "../lib/utils";
import { topics } from "../lib/constants";

export default function useFormUpdatePost(
  postData,
  handlePostUpdated,
  closeDialog
) {
  const { user } = useAuth();

  const methods = useForm({
    defaultValues: {
      content: postData?.textContent || "",
      file: [],
      mediaFiles: [],
      privacy: postData.isPrivate ? 2 : 1,
      topics: postData.topics.map(
        (postTopic) => topics.find((topic) => topic.name === postTopic).id
      ),
    },
  });

  const { register, handleSubmit, setValue, getValues, watch } = methods;
  const [loading, setLoading] = useState(false);

  const files = watch("file");
  const images = watch("mediaFiles");
  const postTopics = watch("topics");
  const postContent = watch("content");
  const fileArray = files instanceof FileList ? Array.from(files) : [];
  const imagesArray = images instanceof FileList ? Array.from(images) : [];

  const handleEmojiClick = (emoji) => {
    setValue("content", getValues("content") + emoji.native);
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = fileArray.filter((_, i) => i !== index);
    const updatedFileList = new DataTransfer();
    updatedFiles.forEach((file) => updatedFileList.items.add(file));
    setValue("file", updatedFiles);
  };

  const handleSelectTopic = (topicId) => {
    const currentTopics = watch("topics") || [];

    if (!Array.isArray(currentTopics)) {
      setValue("topics", []);
      return;
    }

    if (currentTopics.includes(topicId)) {
      const updatedTopics = currentTopics.filter((id) => id !== topicId);
      setValue("topics", updatedTopics);
    } else {
      // Add the topic if it's not already selected.
      const updatedTopics = [...currentTopics, topicId];
      if (updatedTopics.length > 3) {
        toast.error("You can select up to 3 topics");
        return;
      }
      setValue("topics", updatedTopics);
    }
  };

  useEffect(() => {
    register("topics", {
      value: postData.topics.map(
        (postTopic) => topics.find((topic) => topic.name === postTopic).id
      ),
    });
  }, [register, postData.topics]);

  const onSubmit = async (data) => {
    console.log("cac?");
    console.log(data);
    if (!data.content && !data.file) {
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
    const loadMediaFiles = async () => {
      const files = await convertToFiles(postData.mediaFiles);
      if (
        postData.mediaFiles[0]?.type === "DOCUMENT" ||
        postData.mediaFiles[0]?.type === "OTHER"
      ) {
        setValue("file", files);
      } else {
        setValue("mediaFiles", files);
      }
    };

    if (postData.mediaFiles?.length > 0) {
      loadMediaFiles();
    }
  }, [postData.mediaFiles, setValue]);

  return {
    methods,
    loading,
    onSubmit,
    handleEmojiClick,
    images,
    user,
    register,
    handleSubmit,
    handleRemoveFile,
    postTopics,
    handleSelectTopic,
    imagesArray,
    fileArray,
    files,
    postContent,
  };
}
