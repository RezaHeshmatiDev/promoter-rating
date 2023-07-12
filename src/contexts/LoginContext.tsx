import { useState, ReactNode, createContext, useEffect } from "react";
import { LocalUser } from "../utils/Interfaces";
import { getUser, setUser } from "../utils/tokenFuncs";

type LoginContext = {
  submitUserData: (user: LocalUser) => void;
  getUserData: () => LocalUser | null;
};

export const LoginContext = createContext<LoginContext>({} as LoginContext);

type Props = {
  children: ReactNode;
};

export function LoginProvider({ children }: Props) {
  const [userData, setUserData] = useState<LocalUser | null>(getUser());

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      if (!window.location.href.includes("auth")) {
        window.location.href = "/auth";
      }
    }
  }, [userData]);

  const submitUserData = (user: LocalUser) => {
    setUserData(user);
  };

  const getUserData = (): LocalUser | null => {
    return userData;
  };

  return (
    <LoginContext.Provider
      value={{
        submitUserData,
        getUserData,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}
