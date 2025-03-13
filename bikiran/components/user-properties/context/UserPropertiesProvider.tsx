"use client";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TUserProp, TUserResponse } from "../UserPropType";
import { TPagination } from "@/bik-lib/types/response";
import { useApi } from "@/bik-lib/context/api/ApiProvider";

type TContext = {
  userProperties: TUserProp[];
  status: string[];
  pagination: TPagination;
  loading: boolean;
  reload: () => void;
};

const UserPropertiesContext = createContext<TContext>({} as TContext);

export const useUserProp = () => {
  const context = useContext(UserPropertiesContext);
  return context;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const UserPropertiesProvider: FC<TProps> = ({ children, query }) => {
  const [userProperties, setUserProperties] = useState<TUserProp[]>([]);
  const [status, setStatus] = useState<string[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);

  const { get, reloadKey, reload } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get<TUserResponse>("/user/prop", query)
        .then(({ data }) => {
          if (data) {
            setUserProperties(data.users);
            setPagination(data.pagination);
            setStatus(data.status);
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
      userProperties,
      status,
      pagination,
      loading: reloadKey === -1,
      reload,
    };
  }, [userProperties, reloadKey]);

  return (
    <UserPropertiesContext.Provider value={value}>
      {children}
    </UserPropertiesContext.Provider>
  );
};

export default UserPropertiesProvider;
