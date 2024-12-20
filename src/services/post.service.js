import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/posts";

export const PostService = {
  async createPost(data) {
    const url = `${baseUrl}/createPost`;
    const token = localStorage.getItem("jwt-token");

    console.log(url);

    const { content, file, mediaFiles } = data;
    const formData = new FormData();
    const postRequestString = JSON.stringify({
      textContent: content,
      title: "",
      privacyId: 1,
    });
    console.log("postReq: ", postRequestString);

    formData.append("postRequestString", postRequestString);

    file.forEach((file) => {
      formData.append("mediaFiles", file);
    });

    mediaFiles.forEach((file) => {
      formData.append("mediaFiles", file);
    });

    console.log("formData: " + formData);

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      console.log("response", response);
      const responseData = await response.json();
      console.log(responseData);
      return responseData;
    } catch (e) {
      throw new Error(e);
    }
  },
};
