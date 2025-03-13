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
import { TStatus, TAppsDomainListItem } from "../AppsDomainListType";
import { TPagination } from "@/bik-lib/types/response";
import { useApi } from "@/bik-lib/context/api/ApiProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { ApiLoadAppsDomainList } from "../AppsDomainListOperation";

type TContext = {
  appsDomainData: {
    domain: TAppsDomainListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  domain: [],
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

const AppsDomainListContext = createContext<TContext>({
  appsDomainData: initialState,
  loading: false,
  reload: () => {},
});

export const useAppsDomainList = () => {
  const context = useContext(AppsDomainListContext);
  return context as TContext;
};

const AppsDomainListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [appsDomainData, setAppsDomainData] = useState<{
    domain: TAppsDomainListItem[];
    status: TStatus[];
    pagination: TPagination;
  }>(initialState);
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadAppsDomainList(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setAppsDomainData(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  useEffect(() => {
    setReloadKey(-1);
  }, [query]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      appsDomainData,
      reload,
      loading: reloadKey === -1,
    };
  }, [appsDomainData, reloadKey]);
  return (
    <AppsDomainListContext.Provider value={value}>
      {children}
    </AppsDomainListContext.Provider>
  );
};

export default AppsDomainListProvider;
