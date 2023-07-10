import { useState, ReactNode, createContext, useEffect } from "react";
import { User } from "../utils/Interfaces";
import { getUser, setUser } from "../utils/tokenFuncs";

type LoginContext = {
  submitUserData: (user: User) => void;
  getUserData: () => User | null;
};

export const LoginContext = createContext<LoginContext>({} as LoginContext);

type Props = {
  children: ReactNode;
};

export function LoginProvider({ children }: Props) {
  const [userData, setUserData] = useState<User | null>(getUser());

  useEffect(() => {
    if (userData) {
      setUser(userData);
    } else {
      if (!window.location.href.includes("auth")) {
        window.location.href = "/auth";
      }
    }
  }, [userData]);

  const submitUserData = (user: User) => {
    setUserData(user);
  };

  const getUserData = (): User | null => {
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
