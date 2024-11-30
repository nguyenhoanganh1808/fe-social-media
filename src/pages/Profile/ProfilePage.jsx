import styles from "./ProfilePage.module.css";
import CoverPhoto from "../../components/Profile/CoverPhoto/CoverPhoto";
import AvatarContainer from "../../components/Profile/AvatarContainer/AvatarContainer";
import NavBar from "../../components/Profile/NavBar/NavBar";
import Intro from "../../components/Profile/Intro/Intro";
import Skill from "../../components/Profile/Skill/Skill";
import CreatePost from "../../components/Home/CreatePost/CreatePost";
import PostsList from "../../components/Home/PostsList/PostsList";

export default function ProfilePage() {
  const userData = {
    coverPhotoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2dhrA2w0kJcS4h5Ww-yipVpz8kCDsLY0M9w&s",
    avatarUrl:
      "https://cafefcdn.com/thumb_w/640/203337114487263232/2024/10/24/avatar1729758071101-17297580727161334032661.jpg",
    followersNumber: 1984,
    followingNumber: 2003,
    name: "Bryan Nguyễn",
    link: "bryannguyen",
    bio: "Hello ,I’m UI / UX designer. Open to the new Project",
    school:
      "Trường Đại học Công nghệ Thông tin, Đại học Quốc gia Thành phố Hồ Chí Minh",
    skills: [
      "UX Designer",
      "Front end and Back End developer",
      "JS coder",
      "UX Designer",
      "UX Designer",
    ],
    post: [
      {
        userImg:
          "https://cafefcdn.com/thumb_w/640/203337114487263232/2024/10/24/avatar1729758071101-17297580727161334032661.jpg",
        authorName: "Elon Musk",
        content:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
        images: [],
        likeCount: 241000,
        commentCount: 45,
        postTime: new Date("2024-10-24T08:30:00"),
      },
      {
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy111_hGIkCP5T0P1g0Iz0Xp0PEoYegcG04A&s",
        authorName: "HYPEBEAST",
        content: "Sole Mates: Ralph Suguitan and the Nike KD 4 *Easter",
        images: [
          "https://image-cdn.hypb.st/https%3A%2F%2Fhypebeast.com%2Fimage%2F2021%2F12%2Fralph-romeo-nike-kd-4-easter-sole-mates-interview-tw.jpg?w=1080&cbr=1&q=90&fit=max",
        ],
        likeCount: 1000,
        commentCount: 30,
        postTime: new Date("2024-10-22T14:45:00"),
      },
      {
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbSBmVccF2oF01iBU-g5d9TjMLiMOXBjoVrQ&s",
        authorName: "Nat Geo",
        content:
          "Exploring the wonders of the natural world, one story at a time. Dive into the depths of the Amazon rainforest with us.",
        images: [],
        likeCount: 54000,
        commentCount: 120,
        postTime: new Date("2024-10-20T10:15:00"),
      },
      {
        userImg:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGJ8KjlCD3Zcanx5dBQVsu6_XGnSBP-uMrSg&s",
        authorName: "Bill Gates",
        content:
          "Innovation is the key to progress. Looking forward to sharing my thoughts on the future of technology and philanthropy.",
        images: [],
        likeCount: 120000,
        commentCount: 80,
        postTime: new Date("2024-10-18T16:20:00"),
      },
      {
        userImg:
          "https://yt3.googleusercontent.com/lVEb1IUc9D8dZSQF4l8IlBWGjr636qaDHfMbzud0uv_LxdhiMeHtsuvUcSvJa86pWzJd9MCUeQ=s900-c-k-c0x00ffffff-no-rj",
        authorName: "The Verge",
        content:
          "Apple's latest iPhone sets a new standard in mobile technology. Here's everything you need to know.",
        images: [],
        likeCount: 8000,
        commentCount: 50,
        postTime: new Date("2024-10-17T09:00:00"),
      },
      {
        userImg:
          "https://nghiencuuquocte.org/wp-content/uploads/2021/07/29.jpg",
        authorName: "NASA",
        content:
          "A new discovery on Mars shows promise for finding life beyond Earth. Stay tuned for more updates.",
        images: [],
        likeCount: 175000,
        commentCount: 300,
        postTime: new Date("2024-10-16T18:10:00"),
      },
      {
        userImg:
          "https://baogiaothong.mediacdn.vn/603483875699699712/2024/9/25/kennedy-17272242181441827138292.jpg",
        authorName: "SpaceX",
        content:
          "Successfully launched another set of Starlink satellites! Expanding global internet access to remote regions.",
        images: [],
        likeCount: 210000,
        commentCount: 150,
        postTime: new Date("2024-10-15T12:40:00"),
      },
    ],
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.upperContainer}>
        <CoverPhoto coverPhotoUrl={userData.coverPhotoUrl} />
        <AvatarContainer userData={userData} />
        <div className={styles.nameContainer}>
          <p>{userData.name}</p>
          <p>@{userData.link}</p>
        </div>

        <NavBar />
      </div>
      <div className={styles.downContainer}>

        <div className={styles.leftDownContainer}>
          <Intro data={userData}/>
          <Skill />
        </div>
        <div className={styles.rightDownContainer}>
          <CreatePost />
          <PostsList />
        </div>
      </div>
    </div>
  );
}
