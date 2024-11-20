const data = [
  {
    title: "Primary",
    chats: [
      {
        user: {
          avatarUrl: "https://example.com/avatar1.jpg",
          isOnline: true,
          name: "Michel",
        },
        lastMessage: "Hey, how's it going?",
      },
      {
        user: {
          avatarUrl: "https://example.com/avatar2.jpg",
          isOnline: false,
          name: "Alice",
        },
        lastMessage: "Let me know if you're free.",
      },
    ],
  },
  {
    title: "General",
    chats: [
      {
        user: {
          avatarUrl: "https://example.com/avatar3.jpg",
          isOnline: true,
          name: "John",
        },
        lastMessage:
          "Meeting at 3 PM Meeting at 3 PM Meeting at 3 PM Meeting at 3 PM",
      },
      {
        user: {
          avatarUrl: "https://example.com/avatar4.jpg",
          isOnline: true,
          name: "Emma",
        },
        lastMessage: "Happy birthday!",
      },
    ],
  },
  {
    title: "Request",
    chats: [
      {
        user: {
          avatarUrl: "https://example.com/avatar5.jpg",
          isOnline: false,
          name: "Sophia",
        },
        lastMessage: "Can you review my document?",
      },
      {
        user: {
          avatarUrl: "https://example.com/avatar6.jpg",
          isOnline: true,
          name: "David",
        },
        lastMessage: "Request for feedback on the project.",
      },
    ],
  },
];

export default data;
