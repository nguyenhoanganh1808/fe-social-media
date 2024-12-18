import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/auth";

export const AuthService = {
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
      console.log(responseData);
      return responseData;
    } catch (e) {
      throw new Error(e);
    }
  },

  async login(data) {
    const url = `${baseUrl}/login`;
    console.log(data);
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
      console.log("responseData: ", responseData);

      localStorage.setItem("jwt-token", responseData.token);
      return responseData;
    } catch (e) {
      throw new Error(e);
    }
  },

  async logout() {
    localStorage.removeItem("jwt-token");
  },
};
