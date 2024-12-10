import Comment from "./Comment/Comment";

export default function Comments() {
  const commentData = [
    {
      userImg:
        "https://cafefcdn.com/thumb_w/640/203337114487263232/2024/10/24/avatar1729758071101-17297580727161334032661.jpg",
      name: "Michel",
      createdAt: new Date("2024-10-24T08:30:00"),
      content: "The beautiful picture!!!",
      comments: [],
    },
    {
      userImg:
        "https://cafefcdn.com/thumb_w/640/203337114487263232/2024/10/24/avatar1729758071101-17297580727161334032661.jpg",
      name: "Sarah",
      createdAt: new Date("2024-10-24T09:15:00"),
      content: "I totally agree, it looks amazing!",
      comments: [
        {
          userImg: "https://example.com/avatar3.jpg",
          name: "John",
          createdAt: new Date("2024-10-24T09:20:00"),
          content: "Absolutely stunning!",
          comments: [],
        },
      ],
    },
    {
      userImg:
        "https://cafefcdn.com/thumb_w/640/203337114487263232/2024/10/24/avatar1729758071101-17297580727161334032661.jpg",
      name: "Emma",
      createdAt: new Date("2024-10-24T10:00:00"),
      content: "Could you share where this was taken?",
      comments: [
        {
          userImg: "https://example.com/avatar5.jpg",
          name: "Michael",
          createdAt: new Date("2024-10-24T10:10:00"),
          content: "I think it’s in Iceland. It’s gorgeous there!",
          comments: [
            {
              userImg: "https://example.com/avatar6.jpg",
              name: "Sophia",
              createdAt: new Date("2024-10-24T10:15:00"),
              content: "Yes, it’s definitely Iceland! I went there last year.",
              comments: [],
            },
          ],
        },
      ],
    },
    {
      userImg: "https://example.com/avatar7.jpg",
      name: "Lucas",
      createdAt: new Date("2024-10-24T11:30:00"),
      content: "What camera did you use to take this shot?",
      comments: [],
    },
    {
      userImg: "https://example.com/avatar8.jpg",
      name: "Sophia",
      createdAt: new Date("2024-10-24T12:00:00"),
      content: "I love how vibrant the colors are!",
      comments: [
        {
          userImg: "https://example.com/avatar9.jpg",
          name: "Liam",
          createdAt: new Date("2024-10-24T12:30:00"),
          content: "Totally! The lighting is perfect too.",
          comments: [],
        },
      ],
    },
    {
      userImg: "https://example.com/avatar10.jpg",
      name: "Olivia",
      createdAt: new Date("2024-10-24T13:45:00"),
      content: "It makes me want to go on a vacation!",
      comments: [],
    },
  ];
  return (
    <div>
      <h2 className="">
        <strong>Comments</strong>
      </h2>
      <hr />
      {commentData.map((comment, index) => (
        <Comment key={index} {...comment} />
      ))}
    </div>
  );
}
