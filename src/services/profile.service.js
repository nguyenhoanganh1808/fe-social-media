import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/profile";

const ProfileService = {
  async updateBio(newBio) {
    const url = `${baseUrl}/profile/update-profile`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          bio: newBio,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      return { error: error.message };
    }
  },

  async updateProfileImage(profileImageType, file) {
    const url = `${baseUrl}/profile/update-profile-image`;
    const token = localStorage.getItem("jwt-token");

    const formData = new FormData();
    formData.append("profileImage", file);

    const queryParams = new URLSearchParams({
      profileImageType: profileImageType,
    });

    try {
      const response = await fetch(`${url}?${queryParams.toString()}`, {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json(); // Parse JSON response
    } catch (error) {
      console.error("Error updating avatar:", error);
      return { error: error.message };
    }
  },
};

export default ProfileService;
