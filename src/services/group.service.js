import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/groups";

export const GroupService = {
  async createGroup(groupData) {
    const url = baseUrl + "/create";
    const token = localStorage.getItem("jwt-token");
    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...groupData, privacyId: 2 }),
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed when create group");
        console.log(errorText);
        return { error: errorText };
      }
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed when create group");
      return { error: e };
    }
  },
};
