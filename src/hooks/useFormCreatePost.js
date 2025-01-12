import { useForm } from "react-hook-form";
import { PostService } from "../services/post.service";
import { useState } from "react";

const useFormCreatePost = () => {
  const methods = useForm();
  const { watch, setValue } = methods;
  const [loading, setLoading] = useState(false);

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

  const onSubmit = async (data) => {
    setLoading(true);

    const result = await PostService.createPost(data);

    if (result.error) {
      setLoading(false);
      return;
    }

    return result;
  };

  return {
    loading,
    methods,
    isButtonNotDisabled,
    onSubmit,
    fileArray,
    imagesArray,
    handleRemoveFile,
    resetMediaArray,
    resetFileArray,
    postContent,
    setLoading,
    images,
  };
};

export default useFormCreatePost;
