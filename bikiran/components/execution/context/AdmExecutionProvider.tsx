/* eslint-disable no-unused-vars */
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
import { TExecutionData } from "../admExecutionType";
import { ApiLoadAdmExecutionData } from "../AdmExecutionOperation";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";

type TContext = {
  admExecuteData: TExecutionData[] | null | undefined;
  reFetching: boolean;
  reFetch: () => void;
};
const InvoiceExecutionContext = createContext<TContext | undefined>(undefined);

export function useAdmExecution() {
  const context = useContext(InvoiceExecutionContext);
  return context as TContext;
}

type TProps = {
  children: ReactNode;
  authInfo: TAuthInfo;
  query: Record<string, any>;
};

const AdmExecutionProvider: FC<TProps> = ({ children, authInfo, query }) => {
  const [admExecuteData, setAdmExecuteData] = useState<
    TExecutionData[] | null | undefined
  >(undefined);
  const [reload, setReload] = useState(-1);

  // --Load Domain Info
  useEffect(() => {
    if (authInfo.currentUser.userUid && reload !== -2) {
      // Fetch API
      ApiLoadAdmExecutionData(authInfo, query)
        .then(({ data }) => {
          // On Success update data
          setAdmExecuteData(data);
        })
        .catch(() => {
          setAdmExecuteData(null);
        })
        .finally(() => {
          // On Fetching done set reload to -2
          setReload(-2);
        });
    }
  }, [reload, authInfo, query]);

  useEffect(() => {
    setReload(-1);
  }, [query]);

  const reFetch = () => {
    setReload(-1);
  };

  const value = useMemo(() => {
    return {
      admExecuteData,
      reFetching: reload === -1,
      reFetch,
    };
  }, [reload, admExecuteData, authInfo]);

  return (
    <InvoiceExecutionContext.Provider value={value}>
      {children}
    </InvoiceExecutionContext.Provider>
  );
};

export default AdmExecutionProvider;
