import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/reports";

export const ReportService = {
  async reportPost(data) {
    const { postId, reason } = data;
    const url = `${baseUrl}/reportPost/${postId}`;
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
          reason: reason,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to report post");
        return {
          error: errorText,
        };
      }

      toast.success("Report success!");

      return { success: true };
    } catch (e) {
      console.log(e);
      toast.error(e.message || "An error occurred while report post");
      return { error: e.message || "An error occurred while report post" };
    }
  },
};
