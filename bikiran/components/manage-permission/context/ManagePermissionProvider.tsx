// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TState } from "@/bik-lib/types/event";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiLoadPermissionData } from "../ManagePermissionOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";

type TPermissionContext = {
  permissionData: any[];

  loading: boolean;
  reload: () => void;
};

const ManagePermissionContext = createContext<TPermissionContext>({
  permissionData: [],

  loading: false,
  reload: () => {},
});

export const useManagePermission = () => {
  const context = useContext(ManagePermissionContext);
  return context;
};

type TProps = {
  children: ReactNode;
};

const ManagePermissionProvider: FC<TProps> = ({ children }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [permissionData, setPermissionData] = useState<string[]>([]);

  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadPermissionData(authInfo, chkLoginReq)
        .then(({ data }) => {
          setPermissionData(data);
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      permissionData,
      setPermissionData,
      reload,
      loading: reloadKey === -1,
    };
  }, [permissionData, reloadKey]);

  return (
    <ManagePermissionContext.Provider value={value}>
      {children}
    </ManagePermissionContext.Provider>
  );
};

export default ManagePermissionProvider;
