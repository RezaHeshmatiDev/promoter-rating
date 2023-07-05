import { useState, ReactNode, createContext, useEffect } from "react";
import { User } from "../utils/Interfaces";
import { getUser, setUser } from "../utils/tokenFuncs";

type LoginContext = {
  loginToggle: boolean;
  toggleLogin: () => void;
  closeLogin: () => void;
  submitUserData: (user: User) => void;
  getUserData: () => User | null;
};

export const LoginContext = createContext<LoginContext>({} as LoginContext);

type Props = {
  children: ReactNode;
};

export function LoginProvider({ children }: Props) {
  const [userData, setUserData] = useState<User | null>(getUser());
  const [loginToggle, setLoginToggle] = useState<boolean>(
    !userData?.access_token
  );

  useEffect(() => {
    if (userData) setUser(userData);
  }, [userData]);

  const submitUserData = (user: User) => {
    setUserData(user);
  };

  const getUserData = (): User | null => {
    return userData;
  };

  const toggleLogin = () => {
    setLoginToggle(!loginToggle);
  };

  const closeLogin = () => {
    setLoginToggle(false);
  };

  return (
    <LoginContext.Provider
      value={{
        loginToggle,
        toggleLogin,
        closeLogin,
        submitUserData,
        getUserData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
