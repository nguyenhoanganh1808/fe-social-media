import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/search";

export const SearchService = {
  async search(query) {
    const url = baseUrl + "?" + new URLSearchParams({ keyword: query });
    const token = localStorage.getItem("jwt-token");
    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        console.log(errorText);
        return { error: errorText };
      }
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed when search user");
      return { error: e };
    }
  },
  async searchUser(query) {
    const url = baseUrl + "/users?" + new URLSearchParams({ keyword: query });
    const token = localStorage.getItem("jwt-token");
    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText);
        console.log(errorText);
        return { error: errorText };
      }
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed when search user");
      return { error: e };
    }
  },
};
