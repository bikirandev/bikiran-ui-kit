"use client";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiLoadServerData } from "../ManageServerOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TEnvUpdate, TServerData } from "../ManageServerType";
import ModalCreateServer from "../modals/ModalCreateServer";
import ModalUpdateServer from "../modals/ModalUpdateServer";
import ModalUpdateStatus from "../modals/ModalUpdateServerStatus";
import ModalServerEnvUpdate from "../modals/ModalServerEnvUpdate";

type TContext = {
  serverType: string[];
  serverData: TServerData[];
  serverEnv: TEnvUpdate[];
  serverStatus: string[];

  loading: boolean;
  reload: () => void;
};

const ServerListContext = createContext<TContext>({
  serverType: [],
  serverData: [],
  serverEnv: [],
  serverStatus: [],
  loading: false,
  reload: () => {},
});

export const useServerInfo = () => {
  const context = useContext(ServerListContext);
  return context as TContext;
};

const ManageServerProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [serverData, setServerData] = useState<TServerData[]>([]);
  const [serverType, setServerType] = useState<string[]>([]);
  const [serverEnv, setServerEnv] = useState<TEnvUpdate[]>([]);
  const [serverStatus, setServerStatus] = useState<string[]>([]);
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadServerData(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setServerData(data.servers);
            setServerType(data.serverTypes);
            setServerEnv(data.environments);
            setServerStatus(data.serverStatus);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [authInfo, reloadKey, query]);

  useEffect(() => {
    setReloadKey(-1);
  }, [query]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      serverType,
      serverData,
      serverEnv,
      serverStatus,
      reload,
      loading: reloadKey === -1,
    };
  }, [reloadKey]);
  return (
    <ServerListContext.Provider value={value}>
      {children}
      <ModalCreateServer />
      <ModalUpdateServer />
      <ModalUpdateStatus />
      <ModalServerEnvUpdate />
    </ServerListContext.Provider>
  );
};

export default ManageServerProvider;
