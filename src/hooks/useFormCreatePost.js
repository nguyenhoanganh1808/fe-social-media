import { useForm } from "react-hook-form";
import { PostService } from "../services/post.service";
import { useState } from "react";
import { toast } from "react-toastify";

const useFormCreatePost = (closeDialog = () => {}) => {
  const methods = useForm();
  const { watch, setValue } = methods;
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);

  const files = watch("file");
  const images = watch("mediaFiles");
  const postContent = watch("content");
  const fileArray = files instanceof FileList ? Array.from(files) : [];
  const imagesArray = images instanceof FileList ? Array.from(images) : [];

  const isButtonNotDisabled =
    postContent !== "" || fileArray.length > 0 || imagesArray.length > 0;

  const handleRemoveFile = (index) => {
    const updatedFiles = fileArray.filter((_, i) => i !== index);

    const updatedFileList = new DataTransfer();
    updatedFiles.forEach((file) => updatedFileList.items.add(file));

    setValue("file", updatedFileList.files);
  };

  const resetMediaArray = () => {
    const emptyList = new DataTransfer();
    setValue("mediaFiles", emptyList);
  };

  const resetFileArray = () => {
    const emptyList = new DataTransfer();
    setValue("file", emptyList);
  };

  const handleSelect = (topicId) => {
    setSelectedTopics((prevTopics) => {
      if (!prevTopics) prevTopics = [];
      if (prevTopics.includes(topicId)) {
        const updatedTopics = prevTopics.filter((id) => id !== topicId);
        setValue("topics", updatedTopics);
        return updatedTopics;
      } else {
        const updatedTopics = [...prevTopics, topicId];
        if (updatedTopics.length > 3) {
          toast.error("You can select up to 3 topics");
          return prevTopics;
        }
        setValue("topics", updatedTopics);
        return updatedTopics;
      }
    });
  };

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);

    const result = await PostService.createPost(data);

    if (result.error) {
      setLoading(false);
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

  return {
    loading,
    methods,
    isButtonNotDisabled,
    selectedTopics,
    onSubmit,
    fileArray,
    imagesArray,
    handleRemoveFile,
    resetMediaArray,
    resetFileArray,
    postContent,
    setLoading,
    images,
    handleSelect,
  };
};

export default useFormCreatePost;
