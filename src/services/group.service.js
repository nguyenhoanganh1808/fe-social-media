import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";

const baseUrl = API_ENDPOINT + "/groups";

export const GroupService = {
  async leaveGroup(groupId) {
    const url = `${baseUrl}/${groupId}/leave`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed when leave group");
        return { error: errorText };
      }
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed when leave group");
      return { error: e };
    }
  },
  async inviteFriends(groupId, userIds) {
    const url = `${baseUrl}/${groupId}/invite`;
    const token = localStorage.getItem("jwt-token");

    for (const userId of userIds) {
      try {
        const params = new URLSearchParams({ userId: userId });
        const response = await fetch(`${url}?${params}`, {
          mode: "cors",
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          toast.error(`${errorText || "Unknown error"}`);
          return { error: errorText, userId };
        }
        toast.success("Invite success!");
      } catch (e) {
        toast.error(`Failed to invite user ${userId}: ${e.message}`);
        return { error: e, userId };
      }
    }

    return {
      success: true,
      message: "All users processed",
    };
  },

  async getGroupMembers(groupId, page, size) {
    const url =
      `${baseUrl}/${groupId}/members?` +
      new URLSearchParams({ page: page, size: size });
    const token = localStorage.getItem("jwt-token");
    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed when get group member");
        return { error: errorText };
      }
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed when get group member");
      return { error: e };
    }
  },
  async getGroupDetail(groupId) {
    const url = `${baseUrl}/group/${groupId}`;
    const token = localStorage.getItem("jwt-token");
    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed when get group");
        return { error: errorText };
      }
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed when get group");
      return { error: e };
    }
  },

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
