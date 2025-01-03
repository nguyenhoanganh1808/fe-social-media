import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/profile";

const ProfileService = {
  async addSkill(skills) {
    const url = `${baseUrl}/add-skill`;
    const token = localStorage.getItem("jwt-token");

    try {
      const requests = skills.map((skill) =>
        fetch(url, {
          mode: "cors",
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(skill),
        })
      );

      const responses = await Promise.all(requests);

      const failedRequests = [];
      for (const response of responses) {
        if (!response.ok) {
          const errorText = await response.text();
          failedRequests.push(errorText || "Failed to update skill");
        }
      }

      if (failedRequests.length > 0) {
        failedRequests.forEach((error) => toast.error(error));
        return { error: failedRequests };
      }

      toast.success("All skills updated successfully!");
      return { success: true };
    } catch (error) {
      console.error("Error updating skills:", error);
      toast.error("An unexpected error occurred while updating skills.");
      return { error: error.message };
    }
  },

  async updateInformationDetail(newInformationDetail) {
    const url = `${baseUrl}/update-information-detail`;
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
          newInformationDetail,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to update contact");
        return { error: errorText };
      }
      toast.success("Update information success!");
      return { success: true };
    } catch (error) {
      console.error("Error updating contact:", error);
      return { error: error.message };
    }
  },
  async updateContact(newContact) {
    const url = `${baseUrl}/update-contact`;
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
          newContact,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to update contact");
        return { error: errorText };
      }
      toast.success("Update contact success!");
      return { success: true };
    } catch (error) {
      console.error("Error updating contact:", error);
      return { error: error.message };
    }
  },
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
        toast.error(errorText || "Failed to update profile");
        return { error: errorText };
      }
      toast.success("Update profile success!");
      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
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
