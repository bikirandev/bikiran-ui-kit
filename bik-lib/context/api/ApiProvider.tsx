"use client";
import React, { createContext, useContext, useState } from "react";
import { useAuth2 } from "../auth/Auth2Provider";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth from "@/bik-lib/utils/AxiosAPI";

export type TApiResponse<T> = {
  error: boolean;
  message?: string;
  data?: T;
  referenceName?: string;
};

type ApiContextType = {
  get: <T = any>(
    url: string,
    query?: Record<string, any>
  ) => Promise<TApiResponse<T>>;
  post: (url: string, payload: any) => Promise<TApiResponse<any>>;
  put: (url: string, payload: any) => Promise<TApiResponse<any>>;
  delete: (url: string) => Promise<TApiResponse<any>>;
  reloadKey: number;
  reload: (key?: number) => void;
  startLoading: () => void;
  stopLoading: () => void;
  loading: boolean;
};

const ApiContext = createContext<ApiContextType | undefined>(undefined);

export const useApi = (): ApiContextType => {
  const context = useContext(ApiContext);

  return context as ApiContextType;
};

const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(false);
  const { authInfo, chkLoginReq } = useAuth2();

  const request = async <T = any,>(
    method: "get" | "post" | "put" | "delete",
    url: string,
    payload?: any,
    query?: Record<string, any>
  ): Promise<TApiResponse<T>> => {
    try {
      const apiRequest = AxiosAuth.currentUserAuth(authInfo).setUrl(
        `${getApi2Url()}${url}`,
        query
      );

      const { data }: { data: TApiResponse<T> } =
        await apiRequest?.[method](payload);

      chkLoginReq(data as any);
      if (data.error) throw new Error(data.message);

      setReloadKey(-2);
      return data;
    } catch (err) {
      setReloadKey(-2);
      throw err;
    }
  };

  return (
    <ApiContext.Provider
      value={{
        get: (url, query) => request("get", url, undefined, query),
        post: (url, payload) => request("post", url, payload),
        put: (url, payload) => request("put", url, payload),
        delete: (url) => request("delete", url),
        reloadKey,
        reload: (key?: number) =>
          setReloadKey(typeof key === "number" ? key : -1),
        startLoading: () => setLoading(true),
        stopLoading: () => setLoading(false),
        loading,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
