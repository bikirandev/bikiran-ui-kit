// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiLoadTicketInfo } from "../SupportChatOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useParams } from "next/navigation";
import { TSupportResponse } from "../supportChatTypes";

type TContext = {
  supportData: TSupportResponse | undefined;
  reload: () => void;
  loading: boolean;
  isClosed: boolean;
};

const SupportChatContext = createContext<TContext | undefined>(undefined);

export const useSupportChat = () => {
  const context = useContext(SupportChatContext);
  return context as TContext;
};

type TProps = {
  children: ReactNode;
};

const SupportChatProvider: FC<TProps> = ({ children }) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [supportData, setSupportData] = useState<TSupportResponse | undefined>(
    undefined
  );

  const { authInfo, chkLoginReq } = useAuth2();

  const { id } = useParams<any>();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadTicketInfo(authInfo, chkLoginReq, id)
        .then(({ data }) => {
          if (data) {
            setSupportData(data);
          }
        })
        .catch((err: Error) => {
          console.log(err.message);
          setSupportData(undefined);
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
      supportData,
      reload,
      isClosed: supportData?.invoiceInfo?.status === "CLOSED",
      loading: reloadKey === -1,
    };
  }, [supportData, reloadKey]);

  return (
    <SupportChatContext.Provider value={value}>
      {children}
    </SupportChatContext.Provider>
  );
};

export default SupportChatProvider;
