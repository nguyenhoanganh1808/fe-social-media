import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/topics";

export const TopicService = {
  async getTopics() {
    const url = `${baseUrl}/getTopics`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to get topics");
        return {
          error: errorText,
        };
      }

      return { success: true, data: await response.json() };
    } catch (e) {
      console.log(e);
      toast.error(e.message || "Failed to get topics");
      return { error: e.message || "Failed to get topics" };
    }
  },
};
