"use client";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiLoadInvoiceInfo } from "../InvoiceManageOperation";
import { useParams } from "next/navigation";
import {
  TInvoiceData,
  TInvoiceInfo,
  TAddressBilling,
  TAddressShipping,
  TInvoiceProduct,
  TInvoiceOwner,
  TCustomerFAC,
  TInvoiceTransaction,
  TInvoiceActivity,
} from "@/bik-lib/types/invoice";

type TContext = {
  invoiceInfo: TInvoiceData;
  invoice: TInvoiceInfo;
  activities: TInvoiceActivity[];
  billingAddress: TAddressBilling;
  shippingAddress: TAddressShipping;
  products: TInvoiceProduct[];
  scopes: string[];
  scopesAvailable: string[];
  invoiceOwner: TInvoiceOwner;
  customerFac: TCustomerFAC;
  transactions: TInvoiceTransaction[];
  linkDownload: string;
  linkPrint: string;
  reload: (num?: number) => void;
  loading: boolean;
};

const InvoiceManageContext = createContext<TContext | undefined>(undefined);

export const useInvoiceInfo = () => {
  const context = useContext(InvoiceManageContext);
  return context as TContext;
};

type TProps = {
  children: ReactNode;
};

const InvoiceManageProvider: FC<TProps> = ({ children }) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [invoiceInfo, setInvoiceInfo] = useState<TInvoiceData>(
    {} as TInvoiceData
  );

  const { authInfo, chkLoginReq } = useAuth2();
  const { id } = useParams();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadInvoiceInfo(authInfo, chkLoginReq, id as string)
        .then(({ data }) => {
          if (data) {
            setInvoiceInfo(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
          setInvoiceInfo({ ...({} as TInvoiceData), notFound: true });
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  const value = useMemo(() => {
    const reload = (num?: number) => {
      setReloadKey(typeof num === "number" ? num : -1);
    };

    return {
      invoiceInfo,
      invoice: invoiceInfo.invoice,
      activities: invoiceInfo.activity,
      billingAddress: invoiceInfo.addressBilling,
      shippingAddress: invoiceInfo.addressShipping,
      products: invoiceInfo.items,
      transactions: invoiceInfo.transactions as [],
      linkDownload: invoiceInfo.linkDownload,
      linkPrint: invoiceInfo.linkPrint,
      invoiceOwner: invoiceInfo.invoiceOwner,
      customerFac: invoiceInfo.customerFac,
      scopes: invoiceInfo.scopes,
      scopesAvailable: invoiceInfo.scopesAvailable,
      reload,
      loading: reloadKey === -1,
    };
  }, [invoiceInfo, reloadKey]);

  return (
    <InvoiceManageContext.Provider value={value}>
      {children}
    </InvoiceManageContext.Provider>
  );
};

export default InvoiceManageProvider;
