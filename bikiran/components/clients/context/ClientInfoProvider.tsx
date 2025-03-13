import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { TClientData } from "../ClientInfoTypes";
import { ApiLoadClientData } from "../ClientInfoOperations";

export interface IClientInfoContext {
  clientData: TClientData[] | null | undefined;
  loading: boolean;
  reFetch: () => void;
  status: string[];
}

const ClientInfoContext = createContext<IClientInfoContext | undefined>(
  undefined
);

export function useClientInfo() {
  const context = useContext(ClientInfoContext);
  return context as IClientInfoContext;
}

type IProps = {
  children: ReactNode;
  authInfo: TAuthInfo;
  query: Record<string, any>;
};

export const ClientInfoProvider = ({ children, authInfo, query }: IProps) => {
  // reload -2 = no reload, -1 = reload, 0 = default
  const [reload, setReload] = useState<number>(-1);
  const [status, setStatus] = useState<string[]>([]);
  const [clientData, setClientData] = useState<
    TClientData[] | null | undefined
  >(undefined);

  useEffect(() => {
    if (reload !== -2) {
      // Fetch API
      ApiLoadClientData(authInfo, query)
        .then(({ data }) => {
          setClientData(data?.clients);
          if (data?.status) {
            setStatus(data?.status);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReload(-2);
        });
    }
  }, [authInfo, reload, query]);

  // console.log(clientData, "provider");

  useEffect(() => {
    setReload(-1);
  }, [query]);

  const value = useMemo(() => {
    const reFetch = () => {
      setReload(-1);
    };
    return {
      clientData: clientData,
      loading: reload === -1,
      reFetch,
      status,
      reload,
    };
  }, [clientData, reload]);

  return (
    <ClientInfoContext.Provider value={value}>
      {children}
    </ClientInfoContext.Provider>
  );
};
