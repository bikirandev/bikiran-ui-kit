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
import { ApiLoadInvoiceData } from "../InvoiceListOperation";
import ModalCreateInvoice from "../modals/ModalCreateInvoice";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import {
  TInvoiceCurrency,
  TInvoiceDataResponse,
  TInvoiceTableItem,
} from "../InvoiceListTypes";
import { TPagination } from "@/bik-lib/types/response";

type TInvoiceContextType = {
  invoices: TInvoiceTableItem[];
  currencies: TInvoiceCurrency[];
  pagination: TPagination;
  loading: boolean;
  reload: () => void;
};

// Create the context with default value
const InvoiceListContext = createContext<TInvoiceContextType | undefined>(
  undefined
);

// Custom hook to use InvoiceListContext
export function useInvoiceList() {
  const context = useContext(InvoiceListContext);
  return context as TInvoiceContextType;
}

// Define the component props for AppProvider
type Props = {
  children: ReactNode;
  authInfo: TAuthInfo;
  chkLoginReq: (data: any) => void;
  query: Record<string, any>;
};

const InvoiceListProvider: React.FC<Props> = ({
  children,
  authInfo,
  chkLoginReq,
  query,
}) => {
  const [invoiceData, setInvoiceData] = useState<TInvoiceDataResponse>({
    invoices: [],
    currencies: [],
    pagination: {} as TPagination,
  });
  const [reloadKey, setReloadKey] = useState<number>(-1);

  // Load device data
  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadInvoiceData(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setInvoiceData({
              invoices: data.invoices,
              pagination: data.pagination,
              currencies: data.currencites!, // TODO: "Fix typo in 'currencies'",
            });
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
          // setInvoiceData({
          //   invoices: [],
          //   currencies: [],

          // });
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [authInfo, reloadKey, query]);

  useEffect(() => {
    setReloadKey(-1);
  }, [query]);

  const reload = () => {
    setReloadKey(-1);
  };

  // Memoized value to avoid unnecessary re-renders
  const value = useMemo(() => {
    return {
      invoices: invoiceData.invoices,
      pagination: invoiceData.pagination,
      currencies: invoiceData.currencies,
      reload,
      loading: reloadKey === -1,
    };
  }, [reloadKey, invoiceData]);

  return (
    <InvoiceListContext.Provider value={value}>
      {children}
      <ModalCreateInvoice />
    </InvoiceListContext.Provider>
  );
};

export default InvoiceListProvider;
