import { createContext, useContext } from "react";

const AuthContext = createContext({ user: null, login: null, logout: null });

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
