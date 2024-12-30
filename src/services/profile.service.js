import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/profile";

const ProfileService = {
  async updateProfile(newProfile) {
    const url = `${baseUrl}/update-profile`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newProfile,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to update bio");
        throw new Error(`HTTP error status: ${response.status}`);
      }
      toast.success("Update profile success!");
    } catch (error) {
      console.error("Error updating bio:", error);
      return { error: error.message };
    }
  },
  async updateBio(newBio) {
    const url = `${baseUrl}/update-profile`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: newBio,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to update bio");
        throw new Error(`HTTP error status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating bio:", error);
      return { error: error.message };
    }
  },

  async updateProfileImage(profileImageType, file) {
    const url =
      `${baseUrl}/update-profile-image?` +
      new URLSearchParams({ profileImageType: profileImageType });
    const token = localStorage.getItem("jwt-token");

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { error: errorText || "Failed to update profile image" };
      }

      return {
        success: true,
      };
    } catch (error) {
      console.error("Error updating avatar:", error);
      return { error: error.message || "Failed to update profile image" };
    }
  },
};

export default ProfileService;
