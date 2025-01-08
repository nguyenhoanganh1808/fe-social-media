import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/follows";

export const FollowService = {
  async getFollowing() {
    const token = localStorage.getItem("jwt-token");
    const url = `${baseUrl}/get-following`;

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
        toast.error(errorText || "Failed to fetch follow");
        return {
          error: errorText,
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed to fetch following");
      return {
        error: e || "Failed to fetch following",
      };
    }
  },

  async getFollowers() {
    const token = localStorage.getItem("jwt-token");
    const url = `${baseUrl}/get-followers`;

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
        toast.error(errorText || "Failed to fetch follow");
        return {
          error: errorText,
        };
      }

      const data = await response.json();

      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed to fetch follow");
      return {
        error: e || "Failed to fetch follow",
      };
    }
  },
};
