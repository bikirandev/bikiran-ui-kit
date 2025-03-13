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
import { ApiLoadTransaction } from "../TransactionOperation";
import { TTransaction } from "../TransactionTypes";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { TPagination } from "@/bik-lib/types/response";

type TTransactionContextType = {
  transaction: TTransaction[];
  pagination: TPagination;
  refetchTransactionData: () => void;
  reFetching: boolean;
};

// Create the context with default value
const TransactionContext = createContext<TTransactionContextType>({
  transaction: [],
  pagination: {} as TPagination,
  refetchTransactionData: () => {},
  reFetching: false,
});

// Create the custom hook to use the context
export function useTransaction() {
  const context = useContext(TransactionContext);
  return context as TTransactionContextType;
}

// Define the component props for AppProvider
type Props = {
  children: ReactNode;
  authInfo: TAuthInfo;
  query: Record<string, any>;
};

const TransactionProvider: React.FC<Props> = ({
  children,
  authInfo,
  query,
}) => {
  const [transaction, setTransaction] = useState<TTransaction[]>([]);
  const [pagination, setPagination] = useState<TPagination>({} as TPagination);
  const [reloadKey, setReloadKey] = useState<number>(-1);

  // const { closeModal, modalType } = useTemplate();
  // Load device data
  useEffect(() => {
    if (authInfo.currentUser.userUid && reloadKey !== -2) {
      ApiLoadTransaction(authInfo, query)
        .then(({ data }) => {
          setTransaction(data.transactions);
          setPagination(data.pagination);
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

  // //Create Domain Package
  // const createDomainPackage = (payload: TDomainPackagePayload) => {
  //   setFetching(true);
  //   setMessage("Creating project...");
  //   ApiCreateDomainPackage(authInfo, payload)
  //     .then(({ message }) => {
  //       setMessage(message);
  //       closeModal();
  //     })
  //     .catch((err) => {
  //       setMessage(err);
  //     })
  //     .finally(() => {
  //       setFetching(false);
  //     });
  // };

  // Memoized value to avoid unnecessary re-renders
  const refetchTransactionData = () => {
    setReloadKey(-1);
  };
  const value = useMemo(() => {
    return {
      transaction,
      refetchTransactionData,
      pagination,
      reFetching: reloadKey === -1,
    };
  }, [reloadKey, transaction, pagination]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
      {/* <ModalCreateDomain closeModal={closeModal} reFetching={reFetching} show={modalType === "create-domain-package"} createDomainPackage={createDomainPackage} /> */}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
