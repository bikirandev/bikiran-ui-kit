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
import { ApiLoadUserPhonesList } from "../UserPhonesListOperation";
import { TUserPhonesItem } from "../userPhonesType";
import ModalAddPhoneUser from "../modal/ModalAddPhoneUser";
import ModalStatusChange from "../modal/ModalStatusChange";
import { TPagination } from "@/bik-lib/types/response";

type TContext = {
  userPhonesData: {
    contacts: TUserPhonesItem[];
    status: string[];
    pagination: TPagination;
  };
  loading: boolean;
  reload: () => void;
};

const UserPhonesListContext = createContext<TContext>({
  userPhonesData: {
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

export const useUserPhonesList = () => {
  const context = useContext(UserPhonesListContext);
  return context as TContext;
};

const UserPhonesListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [userPhonesData, setUserPhonesData] = useState<{
    contacts: TUserPhonesItem[];
    status: string[];
    pagination: TPagination;
  }>({ contacts: [], status: [], pagination: {} as TPagination });
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadUserPhonesList(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setUserPhonesData(data);
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
      userPhonesData,
      reload,
      loading: reloadKey === -1,
    };
  }, [userPhonesData, reloadKey]);

  return (
    <UserPhonesListContext.Provider value={value}>
      {children}
      <ModalAddPhoneUser />
      <ModalStatusChange />
    </UserPhonesListContext.Provider>
  );
};

export default UserPhonesListProvider;
