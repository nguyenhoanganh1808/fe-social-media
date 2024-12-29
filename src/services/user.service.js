import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/profile";

export const UserService = {
  async createProfile(data) {
    const url = `${baseUrl}/create-profile`;
    const token = localStorage.getItem("jwt-token");

    try {
      await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  },

  async getProfile() {
    const url = `${baseUrl}/get-profile`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (!response) {
        throw new Error("No response from the server");
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to fetch profile");
      }

      const text = await response.text();
      if (!text) {
        return null;
      }

      // Parse the JSON safely
      return JSON.parse(text);
    } catch (e) {
      throw new Error(
        e.message || "An error occurred while fetching the profile"
      );
    }
  },
};
