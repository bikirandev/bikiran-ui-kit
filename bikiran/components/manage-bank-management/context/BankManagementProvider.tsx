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
import { ApiLoadBankManagement } from "../BankManagementOperation";
import {
  TBankAccount,
  TBankCurrency,
  TBankResponse,
} from "../bankManagementTypes";
import ModalAddBankAccount from "../modals/ModalAddBankAccount";
import ModalUpdateBankStatus from "../modals/ModalUpdateBankStatus";

type TContext = {
  pageData: TBankResponse;
  accounts: TBankAccount[];
  currencies: TBankCurrency[];
  loading: boolean;
  reload: () => void;
};

const BankManagementContext = createContext<TContext | undefined>(undefined);

export const useBankManagement = () => {
  const context = useContext(BankManagementContext);
  return context as TContext;
};

const BankManagementProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [pageData, setPageData] = useState<TBankResponse>({} as TBankResponse);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  const { authInfo, chkLoginReq } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadBankManagement(authInfo, chkLoginReq, query)
        .then(({ data }) => {
          if (data) {
            setPageData(data);
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
      pageData,
      accounts: pageData.accounts,
      currencies: pageData.currencies,
      reload,
      loading: reloadKey === -1,
    };
  }, [pageData, reloadKey]);

  return (
    <BankManagementContext.Provider value={value}>
      {children}

      {/* Modals */}
      <ModalAddBankAccount />
      <ModalUpdateBankStatus />
    </BankManagementContext.Provider>
  );
};

export default BankManagementProvider;
