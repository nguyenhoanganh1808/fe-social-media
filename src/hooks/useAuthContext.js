import { createContext, useContext } from "react";

const AuthContext = createContext({
  user: {
    id: null,
    studentCode: null,
    nickName: null,
    tagName: null,
    gender: null,
    bio: null,
    avatarUrl: null,
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
