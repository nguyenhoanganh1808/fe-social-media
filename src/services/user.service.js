import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/profile";

export const UserService = {
  async createProfile(data) {
    const url = `${baseUrl}/create-profile`;
    const token = localStorage.getItem("jwt-token");
    console.log(data);
    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
        method: "POST",
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return responseData;
    } catch (e) {
      throw new Error(e);
    }
  },

  async getProfile() {
    const url = `${baseUrl}/get-profile`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const responseData = await response.json();
      console.log("responseData: ", responseData);
    } catch (e) {
      throw new Error(e);
    }
  },
};
