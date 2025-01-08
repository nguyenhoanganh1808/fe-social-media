import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/chat_groups";

export const ChatGroupService = {
  async CreateChatGroup(data) {
    const token = localStorage.getItem("jwt-token");
    const url = `${baseUrl}/createChatGroup`;

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to create chat group");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
      };
    } catch (e) {
      toast.error(e || "Failed to create chat group");
      return {
        error: e || "Failed to create chat group",
      };
    }
  },
};
