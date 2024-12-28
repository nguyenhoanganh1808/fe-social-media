import { API_ENDPOINT } from "../lib/constants";

const baseUrl = `${API_ENDPOINT}/comments`;

const CommentService = {
  async getReply(commentId) {
    const token = localStorage.getItem("jwt-token");

    const url = `${baseUrl}/${commentId}/getReplies?page=0&size=100&forceFirstAndLastRels=true`;

    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      return data._embedded.commentResponseList;
    } catch (e) {
      throw new Error(e);
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
      const response = await fetch(url, {
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
      const response = await fetch(url, {
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
      const response = await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const data = await response.json();
      return data;
    } catch (e) {
      throw new Error(e);
    }
  },
};

export default CommentService;
