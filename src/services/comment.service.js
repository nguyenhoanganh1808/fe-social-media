import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = `${API_ENDPOINT}/comments`;

const CommentService = {
  async getReply(commentId) {
    const token = localStorage.getItem("jwt-token");

    const url = `${baseUrl}/${commentId}/getReplies?page=0&size=100&forceFirstAndLastRels=true`;

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to fetch reply");
        return {
          error: errorText,
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: data._embedded.commentResponseList,
      };
    } catch (e) {
      toast.error(e || "Failed to fetch reply");
      return {
        error: e || "Failed to fetch reply",
      };
    }
  },
  async replyComment(data, parentId, postId) {
    const { commentinput } = data;
    const token = localStorage.getItem("jwt-token");
    const url = `${baseUrl}/createComment`;
    const formData = new FormData();

    const commentRequestString = {
      content: commentinput,
      postId: postId,
      parentId: parentId,
    };
    console.log("commentReqString: ", commentRequestString);

    formData.append(
      "commentRequestString",
      JSON.stringify(commentRequestString)
    );

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e);
    }
  },
  async createCommentOnPost(data, id) {
    const { commentinput } = data;
    const token = localStorage.getItem("jwt-token");
    const url = `${baseUrl}/createComment`;
    const formData = new FormData();

    const commentRequestString = {
      content: commentinput,
      postId: id,
      parentId: null,
    };
    console.log("commentReqString: ", commentRequestString);

    formData.append(
      "commentRequestString",
      JSON.stringify(commentRequestString)
    );

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }
    } catch (e) {
      throw new Error(e);
    }
  },

  async getComments(postId, page, size, forceFirstAndLastRels) {
    const token = localStorage.getItem("jwt-token");

    let url = `${baseUrl}/getComments?postId=${postId}&page=${page}&size=${size}&forceFirstAndLastRels=${forceFirstAndLastRels}`;

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to fetch comments");
        return {
          error: errorText,
        };
      }

      const data = await response.json();
      return { success: true, data: data };
    } catch (e) {
      toast.error(e || "Failed to fetch comments");
      return {
        errro: e || "Failed to fetch comments",
      };
    }
  },
};

export default CommentService;
