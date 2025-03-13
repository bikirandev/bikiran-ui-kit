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
import { ApiLoadUserEmailsList } from "../UserEmailsListOperation";
import { TUserEmailsItem } from "../userEmailsType";
import ModalAddEmailsUser from "../modal/ModalAddEmailsUser";
import ModalStatusChange from "../modal/ModalStatusChange";
import { TPagination } from "@/bik-lib/types/response";

type TContext = {
  userEmailsData: {
    contacts: TUserEmailsItem[];
    status: string[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const UserEmailsListContext = createContext<TContext>({
  userEmailsData: {
    contacts: [],
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
  },
  loading: false,
  reload: () => {},
});

export const useUserEmailsList = () => {
  const context = useContext(UserEmailsListContext);
  return context as TContext;
};
const UserEmailsListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [userEmailsData, setUserEmailsData] = useState<{
    contacts: TUserEmailsItem[];
    status: string[];
    pagination: TPagination;
  }>({
    contacts: [],
    status: [],
    pagination: {} as TPagination,
  });

  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadUserEmailsList(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setUserEmailsData(data);
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
      userEmailsData,
      reload,
      loading: reloadKey === -1,
    };
  }, [userEmailsData, reloadKey]);

  return (
    <UserEmailsListContext.Provider value={value}>
      {children}
      <ModalAddEmailsUser />
      <ModalStatusChange />
    </UserEmailsListContext.Provider>
  );
};

export default UserEmailsListProvider;
