import { useState, ReactNode, createContext } from "react";

type LoginContext = {
  loginToggle: any;
  toggleLogin: () => void;
  closeLogin: () => void;
};

export const LoginContext = createContext<LoginContext>({} as LoginContext);

type Props = {
  children: ReactNode;
};

export function LoginProvider({ children }: Props) {
  const [loginToggle, setLoginToggle] = useState(false);

  const toggleLogin = () => {
    setLoginToggle(!loginToggle);
  };

  const closeLogin = () => {
    setLoginToggle(false);
  };

  return (
    <LoginContext.Provider value={{ loginToggle, toggleLogin, closeLogin }}>
      {children}
    </LoginContext.Provider>
  );
}
