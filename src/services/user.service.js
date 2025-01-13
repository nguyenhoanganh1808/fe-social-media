import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/profile";

export const UserService = {
  async createProfile(profile) {
    const url = `${baseUrl}/create-profile`;
    const token = localStorage.getItem("jwt-token");
    console.log("token: ", token);
    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed when create profile");
        console.log(errorText);
        return { error: errorText };
      }

      return {
        success: true,
      };
    } catch (e) {
      toast.error(e || "Failed when create profile");
      return { error: e };
    }
  },

  async getProfile() {
    const url = `${baseUrl}/get-profile`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.status === 400) {
        return {
          success: true,
          data: false,
        };
      }

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        return {
          error: errorText,
        };
      }
      const responseData = await response.json();
      return {
        success: true,
        data: responseData,
      };
    } catch (e) {
      toast.error(
        e.message ||
          "An error occurred while AuthService.fetchWithAuthing the profile"
      );
      return {
        error:
          e.message ||
          "An error occurred while AuthService.fetchWithAuthing the profile",
      };
    }
  },
};
