export default function createPost(jsonData) {
  return {
    id: jsonData.id,
    textContent: jsonData.textContent || "",
    title: jsonData.title || "",
    user: {
      id: jsonData.user?.id || null,
      username: jsonData.user?.username || "Anonymous",
      avatarUrl: jsonData.user.avatarUrl,
      role: jsonData.user.role,
      lecturer: jsonData.user.lecture,
      student: jsonData.user.student,
    },
    mediaFiles: jsonData.mediaFiles || [],
    createdAt: jsonData.createdAt || new Date().toISOString(),
    isSaved: jsonData.isSaved || false,
    reactionType: jsonData.reactionType,
    reactionCount: jsonData.reactionCount,
    commentCount: jsonData.commentCount,
    isPrivate: jsonData.privacy.id === 2,
    sharedPost: jsonData.sharedPost,
    topics: jsonData.topics,
  };
}
