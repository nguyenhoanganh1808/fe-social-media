import { useForm } from "react-hook-form";
import { PostService } from "../services/post.service";
import { toast } from "react-toastify";
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

  const handleRemoveFile = (index) => {
    const updatedFiles = fileArray.filter((_, i) => i !== index);

    const updatedFileList = new DataTransfer();
    updatedFiles.forEach((file) => updatedFileList.items.add(file));

    setValue("file", updatedFileList.files);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await PostService.createPost(data);
      toast.success("Post created successfully");
    } catch (e) {
      toast.error(e.message || "Failed to create post");
    }
    setLoading(false);
  };

  return {
    loading,
    methods,
    onSubmit,
    fileArray,
    imagesArray,
    handleRemoveFile,
    postContent,
  };
};

export default useFormCreatePost;
