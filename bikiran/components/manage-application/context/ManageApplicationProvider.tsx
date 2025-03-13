import {
  FC,
  useMemo,
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";
import {
  IProps,
  IAppList,
  IManageApplicationContext,
} from "../ManageApplicationTypes";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { ApiApplicationList } from "../ApplicationApiOperation";
import ModalAddApplication from "../modals/ModalAddApplication";
import ModalUpdateApplication from "../modals/ModalUpdateApplication";
import ModalUpdateApplicationStatus from "../modals/ModalUpdateApplicationStatus";

const ManageAppContext = createContext<IManageApplicationContext | undefined>(
  undefined
);

export function useManageApp() {
  const context = useContext(ManageAppContext);
  return context as IManageApplicationContext;
}

export const ManageApplicationProvider: FC<{
  children: ReactNode;
  authInfo: TAuthInfo;
}> = ({ children, authInfo }: IProps) => {
  const [reload, setReload] = useState<number>(0);
  const [appList, setAppList] = useState<IAppList[] | null | undefined>(
    undefined
  );

  useEffect(() => {
    if (authInfo.currentUser.userUid && reload !== -2) {
      ApiApplicationList(authInfo)
        .then(({ data }) => {
          setAppList(data);
        })
        .catch(() => {
          setAppList(null);
        })
        .finally(() => {
          setReload(-2);
        });
    }
  }, [authInfo, reload]);

  const reFetch = () => {
    setReload(-1);
  };

  const value = useMemo(() => {
    return {
      appList,
      reFetching: reload === -1,
      reFetch,
    };
  }, [appList, reload]);

  return (
    <ManageAppContext.Provider value={value}>
      {children}

      {/* Modals */}
      <ModalAddApplication />
      <ModalUpdateApplication />
      <ModalUpdateApplicationStatus />
    </ManageAppContext.Provider>
  );
};
