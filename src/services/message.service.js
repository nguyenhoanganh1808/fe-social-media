import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/messages";

export const MessageService = {
  async getMessage(conversationId, page, size) {
    const url =
      `${baseUrl}/conversation/${conversationId}?` +
      new URLSearchParams({ page: page, size: size });
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
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
      toast.error(e || "An error occurred while fetch conversation");
      return {
        error: e || "An error occurred while fetch conversation",
      };
    }
  },

  async getMessages(page, size) {
    const url =
      `${baseUrl}/conversations?` +
      new URLSearchParams({ page: page, size: size });
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
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
      toast.error(e || "An error occurred while fetch message");
      return {
        error: e || "An error occurred while fetch message",
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
      const response = await fetch(url, {
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
