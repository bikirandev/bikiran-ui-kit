/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
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
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import ModalStatusChange from "../modal/ModalStatusChange";
import ModalAddProjectsUser from "../modal/ModalAddProjectsUser";
import { ApiLoadUserProjectsList } from "../UserProjectsListOperation";
import { TUserProjectsItem } from "../userProjectsType";
import { TPagination } from "@/bik-lib/types/response";

type TContext = {
  userProjectsData: {
    projects: TUserProjectsItem[];
    status?: string[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const UserProjectsListContext = createContext<TContext>({
  userProjectsData: {
    projects: [],
    pagination: {
      currentPage: 1,
      contentPerPage: 10,
      totalContent: 0,
      numberOfPages: 1,
      showingFrom: 0,
      showingTo: 0,
      pages: [],
    },
  },
  loading: false,
  reload: () => {},
});

export const useUserProjectsList = () => {
  const context = useContext(UserProjectsListContext);
  return context as TContext;
};

const UserProjectsListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [userProjectsData, setUserProjectsData] = useState<{
    projects: TUserProjectsItem[];
    status?: string[];
    pagination: TPagination;
  }>({ projects: [], pagination: {} as TPagination });

  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadUserProjectsList(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setUserProjectsData(data);
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
      userProjectsData,
      reload,
      loading: reloadKey === -1,
    };
  }, [userProjectsData, reloadKey]);

  return (
    <UserProjectsListContext.Provider value={value}>
      {children}
      <ModalAddProjectsUser />
      <ModalStatusChange />
    </UserProjectsListContext.Provider>
  );
};

export default UserProjectsListProvider;
