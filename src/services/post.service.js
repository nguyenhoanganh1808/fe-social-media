import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import createPost from "../models/post";

const baseUrl = API_ENDPOINT + "/posts";

export const PostService = {
  async unSavePost(postId) {
    const url =
      baseUrl +
      "/unsavedPost?" +
      new URLSearchParams({ postId: postId }).toString();
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: postId,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to unsave post");
        return { error: errorText || "Failed to unsave post" };
      }

      return { success: true };
    } catch (e) {
      console.log(e);
      toast.error(e || "An error occurred while unsave post");
      return {
        error: e || "An error occurred while unsave post",
      };
    }
  },
  async savePost(postId) {
    const url =
      baseUrl +
      "/savePost?" +
      new URLSearchParams({ postId: postId }).toString();
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
        toast.error(errorText || "Failed to save post");
        return { error: errorText };
      }

      return { success: true };
    } catch (e) {
      console.log(e);
      toast.error(e || "An error occurred while save the profile");
      return { error: e || "An error occurred while save the profile" };
    }
  },

  async createPost(data) {
    const url = `${baseUrl}/createPost`;
    const token = localStorage.getItem("jwt-token");

    const { content, file, mediaFiles, link } = data;
    const formData = new FormData();
    const postRequestString = JSON.stringify({
      textContent: content,
      title: "",
      privacyId: parseInt(data.privacy),
      link: link,
    });
    formData.append("postRequestString", postRequestString);

    if (file && file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("mediaFiles", file[i]);
      }
    }

    if (mediaFiles && mediaFiles.length > 0) {
      mediaFiles.forEach((file) => {
        formData.append("mediaFiles", file);
      });
    }

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        return {
          error: errorText,
        };
      }
      toast.success("Post created successfully");
      return { success: true };
    } catch (e) {
      toast.error(e || "An error occurred while creating the post");
      return {
        error: e || "An error occurred while creating the post",
      };
    }
  },

  async getFeed(page, size) {
    const url = baseUrl + "/feed" + `?size=${size}&page=${page}`;

    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      const posts = data.map((post) => createPost(post));

      return posts;
    } catch (e) {
      throw new Error(e);
    }
  },

  async getSavedPost(page, size) {
    const url = baseUrl + "/getSavedPosts" + `?size=${size}&page=${page}`;

    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();
      const posts = data.map((post) => createPost(post));

      return posts;
    } catch (e) {
      throw new Error(e);
    }
  },

  async getUserPosts(page, size) {
    const url = baseUrl + "/GetPostByUser" + `?size=${size}&page=${page}`;

    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }

      const data = await response.json();

      const posts = data.map((post) => createPost(post));

      return posts;
    } catch (e) {
      throw new Error(e);
    }
  },

  async deletePost(id) {
    const url = baseUrl + `/${id}`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  async updatePost(id, data) {
    const url = baseUrl + `/updatePost`;
    const token = localStorage.getItem("jwt-token");

    const { content, file, mediaFiles } = data;
    const formData = new FormData();
    const postRequestString = JSON.stringify({
      id: id,
      textContent: content,
      title: "",
      privacyId: 1,
    });
    formData.append("postRequestString", postRequestString);

    if (file && file.length > 0) {
      for (let i = 0; i < file.length; i++) {
        formData.append("mediaFiles", file[i]);
      }
    }

    if (mediaFiles && mediaFiles.length > 0) {
      mediaFiles.forEach((file) => {
        formData.append("mediaFiles", file);
      });
    }

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        return {
          error: errorText,
        };
      }
      return { success: true };
    } catch (e) {
      toast.error(e || "An error occurred while updating the post");
      return {
        error: e || "An error occurred while updating the post",
      };
    }
  },

  async getPostById(postId) {
    const url = `${baseUrl}/${postId}`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to update post");
      }

      return await response.json();
    } catch (e) {
      throw new Error(e);
    }
  },
};
