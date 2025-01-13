import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: {
    id: null,
    userId: null,
    studentCode: null,
    nickName: null,
    tagName: null,
    gender: null,
    bio: null,
    followerCount: null,
    followingCount: null,
    avatarUrl: null,
    skills: [],
    coverImageUrl: null,
    informationDetail: {
      fullName: null,
      major: null,
      schoolYear: null,
      activityClass: null,
      currentCity: null,
      homeTown: null,
      work: null,
    },
    contact: {
      email: null,
      phoneNumber: null,
      address: null,
    },
  },
  login: null,
  setUser: null,
  logout: null,
});

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
