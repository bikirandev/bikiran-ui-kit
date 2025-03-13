"use client";
import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";
import { ApiAdminGetTickets } from "../SupportAdminOperations";
import { TTicketData } from "../SupportTypes";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import SupportAddTicketModal from "../modal/SupportAddTicketModal";

export type SupportAdminDataContextType = {
  reloadTicket: () => void;
  ticketData: TTicketData[] | null | undefined;
  reFetching: boolean;
  reloadKey: number;
  setReloadKey: (key: number) => void;
};
const SupportAdminDataContext = createContext<
  SupportAdminDataContextType | undefined
>(undefined);

export function useAdminSupportData() {
  const context = useContext(SupportAdminDataContext);
  return context as SupportAdminDataContextType;
}

type SupportAdminDataProviderProps = {
  children: ReactNode;
  authInfo: TAuthInfo;
};

const SupportAdminDataProvider = ({
  children,
  authInfo,
}: SupportAdminDataProviderProps) => {
  const [ticketData, setTicketData] = useState<
    TTicketData[] | null | undefined
  >(undefined);
  const [reloadKey, setReloadKey] = useState<number>(-1);
  //handle to get all the tickets
  useEffect(() => {
    if (authInfo.currentUser.userUid && reloadKey !== -2) {
      ApiAdminGetTickets(authInfo)
        .then(({ data }) => {
          setTicketData(data.tickets);
        })
        .catch(() => {
          setTicketData(null);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authInfo, reloadKey]);

  const reloadTicket = () => {
    setReloadKey(-1);
  };

  const value = useMemo(() => {
    return {
      reloadTicket,
      ticketData,
      reFetching: reloadKey === -1,
      setReloadKey,
      reloadKey,
    };
  }, [reloadKey, ticketData]);

  return (
    <SupportAdminDataContext.Provider value={value}>
      {children}
      {/* Modals */}
      <SupportAddTicketModal />
    </SupportAdminDataContext.Provider>
  );
};

export default SupportAdminDataProvider;
