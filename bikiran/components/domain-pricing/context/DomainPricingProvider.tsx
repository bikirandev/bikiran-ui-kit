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
import { ApiLoadDomainPricingData } from "../DomainOperation";
import ModalCreateDomain from "../modals/ModalCreateDomainPackage";
import { TDomainPrice, TVendor } from "../DomainTypes";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import ModalUpdateDomainPackage from "../modals/ModalUpdateDomainPackage";
import ModalUpdateDomainStatus from "../modals/ModalUpdateDomainStatus";
import { TPagination } from "@/bik-lib/types/response";

type DomainPricingContextType = {
  data: {
    domainPackages: TDomainPrice[];
    pagination: TPagination;
    status: string[];
  };
  reFetch: () => void;
  loading: boolean;
  vendorData: TVendor[];
};

// Create the context with default value
const DomainPricingContext = createContext<
  DomainPricingContextType | undefined
>(undefined);

// Custom hook to use DomainPricingContext
export function useDomain() {
  const context = useContext(DomainPricingContext);
  return context as DomainPricingContextType;
}

// Define the component props for AppProvider
type Props = {
  children: ReactNode;
  authInfo: TAuthInfo;
  query: Record<string, any>;
};

const DomainPricingProvider: React.FC<Props> = ({
  children,
  authInfo,
  query,
}) => {
  const [data, setData] = useState<{
    domainPackages: TDomainPrice[];
    pagination: TPagination;
    status: string[];
  }>({
    domainPackages: [],
    pagination: {} as TPagination,
    status: [],
  });
  const [vendorData, setVendorData] = useState<TVendor[]>([]);
  const [reload, setReload] = useState<number>(-1);

  useEffect(() => {
    if (reload !== -2) {
      ApiLoadDomainPricingData(authInfo, query)
        .then(({ data }) => {
          setData(data);
          setVendorData(data.vendors);
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
  // Memoized value to avoid unnecessary re-renders
  const value = useMemo(() => {
    return {
      vendorData,
      data,
      reFetch,
      loading: reload === -1,
    };
  }, [reload, data]);

  return (
    <DomainPricingContext.Provider value={value}>
      {children}
      <ModalCreateDomain />
      <ModalUpdateDomainPackage />
      <ModalUpdateDomainStatus />
    </DomainPricingContext.Provider>
  );
};

export default DomainPricingProvider;
