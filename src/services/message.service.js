import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/messages";

export const MessageService = {
  async getMessage(conversationId, page, size) {
    const url =
      `${baseUrl}/conversation/${conversationId}?` +
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
        toast.error(errorText);
        return {
          error: errorText,
        };
      }

      return { success: true, data: await response.json() };
    } catch (e) {
      toast.error(
        e || "An error occurred while AuthService.fetchWithAuth conversation"
      );
      return {
        error:
          e || "An error occurred while AuthService.fetchWithAuth conversation",
      };
    }
  },

  async getMessages(page, size) {
    const url =
      `${baseUrl}/conversations?` +
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
        toast.error(errorText);
        return {
          error: errorText,
        };
      }

      return { success: true, data: await response.json() };
    } catch (e) {
      toast.error(
        e || "An error occurred while AuthService.fetchWithAuth message"
      );
      return {
        error: e || "An error occurred while AuthService.fetchWithAuth message",
      };
    }
  },

  async getPendingMessages() {
    const url = `${baseUrl}/pending/conversations`;
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
        toast.error(errorText);
        return {
          error: errorText,
        };
      }

      return { success: true, data: await response.json() };
    } catch (e) {
      toast.error(
        e || "An error occurred while AuthService.fetchWithAuth pending message"
      );
      return {
        error:
          e ||
          "An error occurred while AuthService.fetchWithAuth pending message",
      };
    }
  },

  async approveConversation(approve, conversationId) {
    const url =
      `${baseUrl}/approve/${conversationId}?` +
      new URLSearchParams({ approve });
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        return {
          error: errorText,
        };
      }

      return { success: true };
    } catch (e) {
      toast.error(e || "An error occurred while approve");
      return {
        error: e || "An error occurred while approve",
      };
    }
  },

  async sendMessageToUser(userId, data) {
    const url = `${baseUrl}/oneToOne/send`;
    const token = localStorage.getItem("jwt-token");

    const { message } = data;
    const formData = new FormData();
    const sendMessageString = JSON.stringify({
      receiverId: userId,
      content: message,
    });
    formData.append("sendMessageString ", sendMessageString);

    // if (file && file.length > 0) {
    //   for (let i = 0; i < file.length; i++) {
    //     formData.append("mediaFiles", file[i]);
    //   }
    // }

    // if (mediaFiles && mediaFiles.length > 0) {
    //   mediaFiles.forEach((file) => {
    //     formData.append("mediaFiles", file);
    //   });
    // }

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        return {
          error: errorText,
        };
      }

      return { success: true };
    } catch (e) {
      toast.error(e || "An error occurred while sending message");
      return {
        error: e || "An error occurred while sending message",
      };
    }
  },
};
