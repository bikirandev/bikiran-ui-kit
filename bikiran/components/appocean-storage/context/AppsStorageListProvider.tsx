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
import { TStatus, TAppsStorageListItem } from "../AppsStorageListType";
import { TPagination } from "@/bik-lib/types/response";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { ApiLoadAppsStorageList } from "../AppsStorageListOperation";

type TContext = {
  storageList: {
    storage: TAppsStorageListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  storage: [],
  status: [],
  pagination: {
    currentPage: 1,
    contentPerPage: 10,
    totalContent: 0,
    numberOfPages: 1,
    showingFrom: 0,
    showingTo: 0,
    pages: [],
  },
};

const AppsStorageListContext = createContext<TContext>({
  storageList: initialState,
  loading: false,
  reload: () => {},
});

export const useAppsStorageList = () => {
  const context = useContext(AppsStorageListContext);
  return context as TContext;
};

const AppsStorageListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [storageList, setStorageList] = useState<{
    storage: TAppsStorageListItem[];
    status: TStatus[];
    pagination: TPagination;
  }>(initialState);

  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadAppsStorageList(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setStorageList(data);
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
      storageList,
      reload,
      loading: reloadKey === -1,
    };
  }, [storageList, reloadKey]);
  return (
    <AppsStorageListContext.Provider value={value}>
      {children}
    </AppsStorageListContext.Provider>
  );
};

export default AppsStorageListProvider;
