import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/auth";

export const AuthService = {
  async fetchWithAuth(url, options) {
    const token = localStorage.getItem("jwt-token");

    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401) {
      const newAccessToken = await this.refreshAccessToken();

      return fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${newAccessToken}`,
        },
      });
    }

    return response;
  },
  async refreshAccessToken() {
    const refreshToken = localStorage.getItem("refresh-token");

    if (!refreshToken) {
      return { error: "No refresh token found" };
    }

    try {
      const response = await fetch(`${baseUrl}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return { error: errorText || "Failed to refresh token" };
      }

      const { accessToken } = await response.json();
      localStorage.setItem("jwt-token", accessToken);
      return { success: true, data: accessToken };
    } catch (error) {
      toast.error("Session expired. Please log in again.");
      return { error: error || "Session expired. Please log in again." };
    }
  },
  async register(data) {
    const url = `${baseUrl}/register`;

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      localStorage.setItem("jwt-token", responseData.token);

      return responseData;
    } catch (e) {
      throw new Error(e);
    }
  },

  async login(data) {
    const url = `${baseUrl}/login`;

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unknown error occurred");
      }

      const responseData = await response.json();

      const { accessToken, refreshToken } = responseData;

      localStorage.setItem("jwt-token", accessToken);
      localStorage.setItem("refresh-token", refreshToken);
      return responseData;
    } catch (e) {
      throw new Error(e);
    }
  },

  logout() {
    localStorage.removeItem("jwt-token");
    localStorage.removeItem("refresh-token");
  },
};
