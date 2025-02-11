import { API_ENDPOINT } from "../lib/constants";
import { toast } from "react-toastify";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/posts";

export const NotificationService = {
  async markNotificationAsRead(notificationId) {
    const url = `${baseUrl}/${notificationId}/read`;
    const token = localStorage.getItem("jwt-token");
    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed when read notifications");
        return {
          error: errorText,
        };
      }

      return { success: true };
    } catch (e) {
      toast.error(e || "An error occurred while read notifications");
      return {
        error: e || "An error occurred while read notifications",
      };
    }
  },

  async getNotifications(page, size) {
    const url =
      `${baseUrl}/notifications?` +
      new URLSearchParams({ page: page, size: size });
    const token = localStorage.getItem("jwt-token");
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
        toast.error(
          errorText || "Failed when AuthService.fetchWithAuth notifications"
        );
        return {
          error: errorText,
        };
      }

      return { success: true, data: await response.json() };
    } catch (e) {
      toast.error(
        e || "An error occurred while AuthService.fetchWithAuth notifications"
      );
      return {
        error:
          e ||
          "An error occurred while AuthService.fetchWithAuth notifications",
      };
    }
  },
};
