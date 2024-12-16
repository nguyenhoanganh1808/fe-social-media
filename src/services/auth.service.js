import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/auth";

export const AuthService = {
  async register(data) {
    const url = `${baseUrl}/register`;

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      console.log("response", responseData);
    } catch (e) {
      console.error("Error:", e);
      toast.error(e.message || "Something went wrong");
    }
  },
};
