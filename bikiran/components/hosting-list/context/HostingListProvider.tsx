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
import {
  TCpServers,
  TCurrency,
  THostingListItem,
  TPackage,
} from "../hostingListType";
import { ApiLoadHostingList } from "../HostingListOperation";
import ModalAddHostingUser from "../modal/ModalAddHostingUser";
import ModalUpdateBasic from "../modal/ModalUpdateBasic";
import ModalUpdateOwnership from "../modal/ModalUpdateOwnership";
import ModalUpdatePricing from "../modal/ModalUpdatePricing";
import ModalUpdateStatus from "../modal/ModalUpdateStatus";
import ModalUpdatePackage from "../modal/ModalUpdatePackage";
import { TPagination } from "@/bik-lib/types/response";
import { s } from "framer-motion/dist/types.d-6pKw1mTI";

type TContext = {
  currencies: TCurrency[];
  packageData: TPackage[];
  pagination: TPagination;
  hostingListData: THostingListItem[];
  cpServers: TCpServers[];
  status: string[];
  loading: boolean;
  reload: () => void;
};

const HostingListContext = createContext<TContext>({
  currencies: [],
  hostingListData: [],
  pagination: {} as TPagination,
  packageData: [],
  cpServers: [],
  status: [],
  loading: false,
  reload: () => {},
});

export const useHostingList = () => {
  const context = useContext(HostingListContext);
  return context as TContext;
};

const HostingListProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [hostingListData, setHostingListData] = useState<THostingListItem[]>(
    []
  );
  const [currencies, setCurrencies] = useState<TCurrency[]>([]);
  const [cpServers, setCpServers] = useState<TCpServers[]>([]);
  const [packageData, setPackageData] = useState<TPackage[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);
  const [status, setStatus] = useState<string[]>([]);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadHostingList(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setCurrencies(data.currencies);
            setHostingListData(data?.hostings);
            setPackageData(data?.packages);
            setStatus(data?.status);
            setCpServers(data?.cpServers);
            setPagination(data?.pagination);
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
      packageData,
      currencies,
      cpServers,
      hostingListData,
      pagination,
      status,
      reload,
      loading: reloadKey === -1,
    };
  }, [hostingListData, reloadKey]);

  return (
    <HostingListContext.Provider value={value}>
      {children}
      <ModalAddHostingUser />
      <ModalUpdateBasic />
      <ModalUpdateOwnership />
      <ModalUpdatePricing />
      <ModalUpdateStatus />
      <ModalUpdatePackage />
    </HostingListContext.Provider>
  );
};

export default HostingListProvider;
