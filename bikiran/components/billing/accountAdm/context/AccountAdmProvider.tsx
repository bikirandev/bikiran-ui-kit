import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiLoadAccountAdmData } from "../AccountAdmOperation";
import {
  IAccountAdmContext,
  TAccountAdmData,
  TAccountFilters,
} from "../AccountAdmTypes";
import { TPagination } from "@/bik-lib/types/response";

const AccountAdmContext = createContext<IAccountAdmContext | undefined>(
  undefined
);

export function useAccountAdmContext() {
  const context = useContext(AccountAdmContext);
  return context as IAccountAdmContext;
}

type IProps = {
  children: React.ReactNode;
  authInfo: TAuthInfo;
  query: Record<string, any>;
};

export const AccountAdmProvider = ({ children, authInfo, query }: IProps) => {
  // reload -2 = no reload, -1 = reload, 0 = default
  const [reload, setReload] = useState<number>(0);
  const [data, setData] = useState<TAccountAdmData[] | null | undefined>(
    undefined
  );
  const [filters, setFilters] = useState<TAccountFilters>(
    {} as TAccountFilters
  );
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);

  useEffect(() => {
    if (authInfo.currentUser.userUid && reload !== -2) {
      ApiLoadAccountAdmData(authInfo, query)
        .then(({ data }) => {
          setData(data.accounts);
          setFilters(data.filters);
          setPagination(data.pagination);
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReload(-2);
        });
    }
  }, [authInfo, reload, query]);

  useEffect(() => {
    setReload(-1);
  }, [query]);
  const reFetch = () => {
    setReload(-1);
  };

  const value = useMemo(() => {
    return {
      data: data,
      pagination,
      setData: setData,
      reFetching: reload === -1,
      reFetch,
      filters,
    };
  }, [data, pagination, reload]);

  return (
    <AccountAdmContext.Provider value={value}>
      {children}
    </AccountAdmContext.Provider>
  );
};
