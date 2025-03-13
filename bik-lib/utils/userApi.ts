import { useAuth2 } from "../context/auth/Auth2Provider";
import AxiosAuth from "./AxiosAPI";
import { getApi2Url } from "./Env";
import { useSyncExternalStore } from "react";

export type TApiResponse<T> = {
  error: boolean;
  message?: string;
  data?: T;
  referenceName?: string;
};

// Global state for reloadKey
let reloadKey = -1;
const listeners = new Set<(key: number) => void>();

/**
 * Custom hook to handle API requests with authentication and error handling.
 * Ensures `reloadKey` is reactive and accessible outside the hook.
 */
const useApi = () => {
  const { authInfo, chkLoginReq } = useAuth2();

  // Function to update reloadKey and notify all subscribers
  const setReloadKey = (key: number) => {
    reloadKey = key;
    listeners.forEach((callback) => callback(key));
  };

  // Function to return the latest reloadKey
  const getReloadKey = () => reloadKey;

  // React's built-in subscription system to force re-renders
  const subscribe = (callback: () => void) => {
    const listener = () => callback();
    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  // Use `useSyncExternalStore` to force re-render when reloadKey updates
  const reactiveReloadKey = useSyncExternalStore(subscribe, getReloadKey);

  const request = async <T = any>(
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

      setReloadKey(-2); // Reset reload key after successful request
      return data;
    } catch (err) {
      setReloadKey(-2);
      throw err;
    }
  };

  return {
    get: <T = any>(
      url: string,
      query?: Record<string, any>
    ): Promise<TApiResponse<T>> => request("get", url, undefined, query),

    post: (url: string, payload: any) => request("post", url, payload),
    put: (url: string, payload: any) => request("put", url, payload),
    delete: (url: string) => request("delete", url),

    reloadKey: reactiveReloadKey, // Reactive reloadKey
    reload: (key?: number) => setReloadKey(typeof key === "number" ? key : -1),
  };
};

export default useApi;
