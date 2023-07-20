import {
  useState,
  ReactNode,
  createContext,
  useEffect,
  useContext,
} from "react";
import { apiGetCommons } from "../services/api/DashboardApi";
import { LoginContext } from "./LoginContext";

type HeaderContext = {
  getHeaderData: () => {
    value: string,
    description: string,
    userID: number
  };
};

export const HeaderContext = createContext<HeaderContext>({} as HeaderContext);

type Props = {
  children: ReactNode;
};

export function HeaderProvider({ children }: Props) {
  const [headerData, setHeaderData] = useState<any[]>([]);

  const { getUserData } = useContext(LoginContext);

  useEffect(() => {
    const userId = getUserData()?.sub || 0;
    apiGetCommons(userId).then((result) => {
      setHeaderData(result);
    });
  }, []);

  const getHeaderData = () => {
    if (headerData.length > 0) {
      return headerData[0];
    }

    return [];
  };

  return (
    <HeaderContext.Provider
      value={{
        getHeaderData,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
}
