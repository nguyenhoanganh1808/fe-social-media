export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

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
