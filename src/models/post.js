export default function createPost(jsonData) {
  return {
    id: jsonData.id,
    textContent: jsonData.textContent || "",
    title: jsonData.title || "",
    user: {
      id: jsonData.user?.id || null,
      username: jsonData.user?.username || "Anonymous",
    },
    mediaFiles: jsonData.mediaFiles || [],
    createdAt: jsonData.createdAt || new Date().toISOString(),
    isSaved: jsonData.isSaved || false,
    reactionType: jsonData.reactionType,
  };
}
