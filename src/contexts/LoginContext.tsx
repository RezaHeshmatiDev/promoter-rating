import { useState, ReactNode, createContext, useEffect } from "react";
import { User } from "../utils/Interfaces";

type LoginContext = {
  loginToggle: boolean;
  toggleLogin: () => void;
  closeLogin: () => void;
  // submitUserData: (user: User) => void;
};

export const LoginContext = createContext<LoginContext>({} as LoginContext);

type Props = {
  children: ReactNode;
};

export function LoginProvider({ children }: Props) {
  // const user: string | null = localStorage.getItem("userData");
  // const [userData, setUserData] = useState<User | null>(
  //   JSON.parse(user || "null")
  // );

  const [loginToggle, setLoginToggle] = useState<boolean>(false);

  // useEffect(() => {
  //   localStorage.setItem("userData", JSON.stringify(userData));
  // }, [userData]);

  // const submitUserData = (user: User) => {
  //   setUserData(user);
  // };

  const toggleLogin = () => {
    setLoginToggle(!loginToggle);
  };

  const closeLogin = () => {
    setLoginToggle(false);
  };

  return (
    <LoginContext.Provider
      value={{
        loginToggle, toggleLogin, closeLogin
        // , submitUserData
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
