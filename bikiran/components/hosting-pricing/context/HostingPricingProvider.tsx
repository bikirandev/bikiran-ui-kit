/* eslint-disable no-unused-vars */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import { ApiLoadHostingPricingData } from "../HostingOperation";
import { THostingPkg, TTypes } from "../HostingTypes";
import ModalCreateHostingPackage from "../modals/ModalCreateHostingPackage";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import ModalUpdateHostingPackage from "../modals/ModalUpdateHostingPack";
import ModalStatusChange from "../modals/ModalStatusChange";
import { TPagination } from "@/bik-lib/types/response";

type HostingPricingContextType = {
  hostingPriceData: {
    hostingPackages: THostingPkg[];
    status: string[];
    pagination: TPagination;
    subTypes: string[];
    diskTypes: string[];
    locations: string[];
  };
  loading: boolean;
  reload: () => void;
};

const HostingPricingContext = createContext<HostingPricingContextType>({
  hostingPriceData: {
    hostingPackages: [],
    pagination: {} as TPagination,
    status: [],
    subTypes: [],
    diskTypes: [],
    locations: [],
  },
  loading: false,
  reload: () => {},
});

export function useHosting() {
  const context = useContext(HostingPricingContext);
  return context as HostingPricingContextType;
}

type Props = {
  children: ReactNode;
  authInfo: TAuthInfo;
  query: Record<string, any>;
};
const HostingPricingProvider: React.FC<Props> = ({
  children,
  authInfo,
  query,
}) => {
  const [hostingPriceData, setHostingPriceData] = useState<{
    hostingPackages: THostingPkg[];
    status: string[];
    subTypes: string[];
    diskTypes: string[];
    locations: string[];
    pagination: TPagination;
  }>({
    hostingPackages: [],
    status: [],
    subTypes: [],
    diskTypes: [],
    locations: [],
    pagination: {} as TPagination,
  });
  const [reloadKey, setReloadKey] = useState<number>(-1);

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadHostingPricingData(authInfo, query)
        .then(({ data }) => {
          setHostingPriceData(data);
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
      hostingPriceData,
      reload,
      loading: reloadKey === -1,
    };
  }, [reloadKey, hostingPriceData]);

  return (
    <HostingPricingContext.Provider value={value}>
      {children}
      <ModalCreateHostingPackage />
      <ModalUpdateHostingPackage />
      <ModalStatusChange />
    </HostingPricingContext.Provider>
  );
};

export default HostingPricingProvider;
