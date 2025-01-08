import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/reactions";

const ReactionService = {
  async reactPost(id) {
    const url = baseUrl + "/reactPost";
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await AuthService.fetchWithAuth(url, {
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
        toast.error(errorText || "Failed to react post");
        return {
          error: errorText,
        };
      }

      return { success: true };
    } catch (e) {
      console.log(e);
      toast.error(e.message || "An error occurred while reacting to post");
      return { error: e.message || "An error occurred while reacting to post" };
    }
  },

  async deleteReaction(postId) {
    const url = `${baseUrl}/deleteReaction?postId=${postId}`;

    const token = localStorage.getItem("jwt-token");

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to delete reaction");
        return {
          error: errorText || "Failed to delete reaction",
        };
      }
      return {
        success: true,
      };
    } catch (e) {
      console.log(e);
      toast.error(e.message || "An error occurred while deleting the reaction");
      return {
        error: e.message || "An error occurred while deleting the reaction",
      };
    }
  },
};

export default ReactionService;
