import { toast } from "react-toastify";
import { API_ENDPOINT } from "../lib/constants";
import { AuthService } from "./auth.service";

const baseUrl = API_ENDPOINT + "/groups";

export const GroupService = {
  async getGroups(userId) {
    const url = `${baseUrl}/getGroups/${userId}`;
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

  async getPendingPosts(page, size, groupId) {
    const url =
      `${baseUrl}/${groupId}/pendingPosts?` +
      new URLSearchParams({ page, size });
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
        toast.error(errorText || "Failed when fetching post");
        return { error: errorText };
      }
      const data = await response.json();
      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed when fetching post");
      return { error: e };
    }
  },
  async leaveGroup(groupId) {
    const url = `${baseUrl}/${groupId}/leave`;
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await AuthService.fetchWithAuth(url, {
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
        const response = await AuthService.fetchWithAuth(`${url}?${params}`, {
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
          continue;
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

  async getGroupInvitations() {
    const url = `${baseUrl}/group/invitations`;
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
        toast.error(`${errorText || "Unknown error"}`);
        return { error: errorText || "Unknown error" };
      }

      return {
        success: true,
        data: await response.json(),
      };
    } catch (e) {
      toast.error(e.message || "Unknown error");
      return { error: e.message || "Unknown error" };
    }
  },

  async addMembers(groupId, userIds) {
    const url = `${baseUrl}/${groupId}/addMember`;
    const token = localStorage.getItem("jwt-token");

    for (const userId of userIds) {
      try {
        const params = new URLSearchParams({ userId: userId });
        const response = await AuthService.fetchWithAuth(`${url}?${params}`, {
          mode: "cors",
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          toast.error(`${errorText || "Unknown error"}`);
          continue;
        }
        toast.success("Add member success!");
      } catch (e) {
        toast.error(`Failed to add user ${userId}: ${e.message}`);
        return { error: e, userId };
      }
    }

    return {
      success: true,
      message: "All users processed",
    };
  },

  async respondInvitation(data) {
    const { invitationId, status } = data;
    const url =
      `${baseUrl}/invitation/${invitationId}/respond?` +
      new URLSearchParams({ status: status });
    const token = localStorage.getItem("jwt-token");

    try {
      const response = await AuthService.fetchWithAuth(url, {
        mode: "cors",
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        toast.error(errorText || "Failed when respond to invite");
        return { error: errorText };
      }

      return {
        success: true,
      };
    } catch (e) {
      toast.error(e || "Failed when respond to invite");
      return { error: e };
    }
  },

  async getGroupMembers(groupId, page, size) {
    const url =
      `${baseUrl}/${groupId}/members?` +
      new URLSearchParams({ page: page, size: size });
    const token = localStorage.getItem("jwt-token");
    try {
      const response = await AuthService.fetchWithAuth(url, {
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
      const response = await AuthService.fetchWithAuth(url, {
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

  async getGroupsByUserId(userId) {
    const url = `${baseUrl}/getGroups/${userId}`;
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
        toast.error(errorText || "Failed when fetch group");
        console.log(errorText);
        return { error: errorText };
      }
      const data = await response.json();

      return {
        success: true,
        data: data,
      };
    } catch (e) {
      toast.error(e || "Failed when fetch group");
      return { error: e };
    }
  },

  async createGroup(groupData) {
    const url = baseUrl + "/create";
    const token = localStorage.getItem("jwt-token");
    try {
      const response = await AuthService.fetchWithAuth(url, {
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
      toast.success("Group created successfully");
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
