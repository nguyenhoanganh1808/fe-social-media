import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/chatbot";

export const ChatbotService = {
  async sendMessage(message) {
    const token = localStorage.getItem("jwt-token");

    const url = `${baseUrl}/send-message`;

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to send message");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
      };
    } catch (e) {
      toast.error(e || "Failed to send message");
      return {
        error: e || "Failed to send message",
      };
    }
  },

  async getMessages(page, size) {
    const token = localStorage.getItem("jwt-token");

    const url =
      `${baseUrl}/conversation?` + new URLSearchParams({ page, size });

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
        toast.error(errorText || "Failed to get message");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
        data: await response.json(),
      };
    } catch (e) {
      toast.error(e || "Failed to get message");
      return {
        error: e || "Failed to get message",
      };
    }
  },
};
