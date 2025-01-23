import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";
import { getCookie } from "../lib/utils";

const baseUrl = API_ENDPOINT + "/educations";

export const EduService = {
  async fetchExamSchedule() {
    const token = getCookie("eduAuthToken");
    const url =
      `${baseUrl}/fetchExamSchedule?` +
      new URLSearchParams({
        token: token,
      });
    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "GET",
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to fetch exam schedule");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
        data: await response.json(),
      };
    } catch (e) {
      toast.error(e || "Failed to fetch exam schedule");
      return {
        error: e || "Failed to fetch exam schedule",
      };
    }
  },

  async fetchStudentProfile() {
    const token = getCookie("eduAuthToken");
    const url =
      `${baseUrl}/fetchStudentProfile?` +
      new URLSearchParams({
        token: token,
      });
    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "GET",
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to fetch student profile");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
        data: await response.json(),
      };
    } catch (e) {
      toast.error(e || "Failed to fetch student profile");
      return {
        error: e || "Failed to fetch student profile",
      };
    }
  },
  async fetchNotification() {
    const token = getCookie("eduAuthToken");
    const url =
      `${baseUrl}/fetchNotification?` +
      new URLSearchParams({
        token: token,
      });
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
        toast.error(errorText || "Failed to fetch notification");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
        data: await response.json(),
      };
    } catch (e) {
      toast.error(e || "Failed to fetch notification");
      return {
        error: e || "Failed to fetch notification",
      };
    }
  },
  async fetchSchedule(sem, year) {
    const token = getCookie("eduAuthToken");
    const url =
      `${baseUrl}/fetchSchedule?` +
      new URLSearchParams({
        token: token,
        hocky: sem,
        namhoc: year,
      });
    const jwtToken = localStorage.getItem("jwt-token");
    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to fetch schedule");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
        data: await response.json(),
      };
    } catch (e) {
      toast.error(e || "Failed to fetch schedule");
      return {
        error: e || "Failed to fetch schedule",
      };
    }
  },
  async fetchScore() {
    const token = getCookie("eduAuthToken");
    const jwtToken = localStorage.getItem("jwt-token");
    const url =
      `${baseUrl}/fetchScore?` +
      new URLSearchParams({
        token: token,
      });
    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to fetch score");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
        data: await response.json(),
      };
    } catch (e) {
      toast.error(e || "Failed to fetch score");
      return {
        error: e || "Failed to fetch score",
      };
    }
  },
  async login(data) {
    const token = localStorage.getItem("jwt-token");
    const url = `${baseUrl}/loginToEducationSystem`;

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed to login");
        return {
          error: errorText,
        };
      }

      return {
        success: true,
        data: await response.json(),
      };
    } catch (e) {
      toast.error(e || "Failed to login");
      return {
        error: e || "Failed to login",
      };
    }
  },
};
