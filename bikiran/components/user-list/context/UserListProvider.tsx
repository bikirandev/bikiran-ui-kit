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
import { TStatus, TUserListItem } from "../userListType";
import ModalCreateUser from "../modals/ModalCreateUser";
import ModalUpdateUser from "../modals/ModalUpdateUser";
import ModalStatusChange from "../modals/ModalStatusChange";
import { TPagination } from "@/bik-lib/types/response";
import ModalImportResellbiz from "../modals/ModalImportResellbiz";
import { useApi } from "@/bik-lib/context/api/ApiProvider";

type TContext = {
  userListData: {
    users: TUserListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const initialState = {
  users: [],
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

const UserListContext = createContext<TContext>({
  userListData: initialState,

  loading: false,
  reload: () => {},
});

export const useUserList = () => {
  const context = useContext(UserListContext);
  return context as TContext;
};

type TUserData = {
  users: TUserListItem[];
  status: TStatus[];
  pagination: TPagination;
};

const UserListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [userListData, setUserListData] = useState<TUserData>(initialState);
  const { get, reloadKey, reload } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<TUserData>("/admin/user", query)
        .then(({ data }) => {
          if (data) {
            setUserListData(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
        });
    }
  }, [reloadKey]);

  useEffect(() => {
    reload();
  }, [query]);

  const value = useMemo(() => {
    return {
      userListData,
      reload: () => reload(),
      loading: reloadKey === -1,
    };
  }, [userListData, reloadKey]);

  return (
    <UserListContext.Provider value={value}>
      {children}
      <ModalCreateUser />
      <ModalUpdateUser />
      <ModalStatusChange />
      <ModalImportResellbiz />
    </UserListContext.Provider>
  );
};

export default UserListProvider;
