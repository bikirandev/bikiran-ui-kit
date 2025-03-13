// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TState } from "@/bik-lib/types/event";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiLoadDeletedDomains } from "../DomainDeletedListOperation";
import { DomainDeletedListType } from "../DomainDeletedListType";

type TDomainDeleted = {
  data: DomainDeletedListType;
  setData: TState<DomainDeletedListType>;
  loading: boolean;
  reload: () => void;
};

const DeletedDomainContext = createContext<TDomainDeleted>({
  data: {} as DomainDeletedListType,
  setData: () => {},
  loading: false,
  reload: () => {},
});

export const useDeletedDomain = () => {
  const context = useContext(DeletedDomainContext);
  return context;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const DomainDeletedListProvider: FC<TProps> = ({ children, query }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<DomainDeletedListType>(
    {} as DomainDeletedListType
  );
  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadDeletedDomains(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          setData(data);
        })
        .catch((err: Error) => {
          console.log(err.message);
          setData({} as DomainDeletedListType);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };

    return {
      data: data,
      setData: setData,
      loading: reloadKey === -1,
      reload,
    };
  }, [data, reloadKey]);

  return (
    <DeletedDomainContext.Provider value={value}>
      {children}
    </DeletedDomainContext.Provider>
  );
};

export default DomainDeletedListProvider;
