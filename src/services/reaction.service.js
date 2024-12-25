import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/reactions";

const ReactionService = {
  async reactPost(id) {
    const url = baseUrl + "/reactPost";
    const token = localStorage.getItem("jwt-token");

    console.log("URL:", url);
    console.log("Token:", token);
    console.log(
      "Request Body:",
      JSON.stringify({ postId: id, reactionTypeId: 1 })
    );

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: id,
          reactionTypeId: 1,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to react profile");
      }

      return response;
    } catch (e) {
      console.log(e);
      throw new Error(e.message || "An error occurred while react the profile");
    }
  },

  async deleteReaction(postId) {
    const url = `${baseUrl}/deleteReaction?postId=${postId}`;

    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to react profile");
      }
      return response;
    } catch (e) {
      throw new Error(e.message || "An error occurred while react the profile");
    }
  },
};

export default ReactionService;
