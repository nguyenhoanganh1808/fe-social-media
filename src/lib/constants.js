export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const CHAT_BOT_AVATAR =
  "https://media.istockphoto.com/id/1010001882/vector/%C3%B0%C3%B0%C2%B5%C3%B1%C3%B0%C3%B1%C3%B1.jpg?s=612x612&w=0&k=20&c=1jeAr9KSx3sG7SKxUPR_j8WPSZq_NIKL0P-MA4F1xRw=";

export const MEDIA_TYPE = {
  MEDIA: "media",
  GIF: "gif",
  FILE: "file",
};

export const majors = [
  "Information Technology",
  "Computer Science",
  "Software Engineering",
  "Information Systems",
  "Computer Networks and Communications",
  "Data Science",
  "Artificial Intelligence",
  "Integrated Circuit Design",
  "Information Security",
  "E-Commerce",
];

export const groupNavItem = [
  {
    title: "Discussion",
    to: "",
  },
  {
    title: "Media",
    to: "media",
  },
  {
    title: "Files",
    to: "files",
  },
  {
    title: "Members",
    to: "members",
  },
];

export const semestersData = [
  {
    id: 1,
    name: "Học kỳ 1",
    startDate: "2025-01-01", // Example start date
    endDate: "2025-05-31", // Example end date
    description: "This is the first semester of the academic year.",
  },
  {
    id: 2,
    name: "Học kỳ 2",
    startDate: "2025-06-01", // Example start date
    endDate: "2025-10-31", // Example end date
    description: "This is the second semester of the academic year.",
  },
  // {
  //   id: 3,
  //   name: "Học kỳ hè",
  //   startDate: "2025-11-01", // Example start date
  //   endDate: "2025-12-31",  // Example end date
  //   description: "This is the summer semester, typically shorter and more intensive.",
  // },
];

export const years = Array.from(
  { length: 2025 - 1990 + 1 },
  (_, i) => 1990 + i
);

export const topics = [
  {
    id: 1,
    name: "Software Development",
    description: "string",
  },
  {
    id: 2,
    name: "Machine Learning",
    description: "string",
  },
  {
    id: 3,
    name: "Information Technology",
    description: "string",
  },
  {
    id: 4,
    name: "Q&A",
    description: "string",
  },
];
