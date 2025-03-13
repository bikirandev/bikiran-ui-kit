import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiLoadCurrencyConfData } from "../CurrencyConfOperation";
import { ICurrencyConfContext, TCurrencyConfData } from "../CurrencyConfTypes";
import CurrencyConfUpdateModal from "../modals/CurrencyConfUpdateModal";

const CurrencyConfContext = createContext<ICurrencyConfContext>({
  data: [],
  loading: false,
  reload: () => {},
  status: [],
});

export function useCurrencyConfContext() {
  const context = useContext(CurrencyConfContext);
  return context as ICurrencyConfContext;
}
interface IProps {
  children: React.ReactNode;
  authInfo: TAuthInfo;
  query: Record<string, any>;
}

export const CurrencyConfProvider = ({ children, authInfo, query }: IProps) => {
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TCurrencyConfData[] | null | undefined>(
    undefined
  );
  const [status, setStatus] = useState<string[]>([]);

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadCurrencyConfData(authInfo, query)
        .then((data) => {
          setData(data.data.currencies);
          setStatus(data.data.statusOptions);
        })
        .catch(() => {
          setData(null);
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
      data: data,
      setData: setData,
      loading: reloadKey === -1,
      reload,
      status,
    };
  }, [data, reloadKey]);

  return (
    <CurrencyConfContext.Provider value={value}>
      {children}

      {/* modals */}
      <CurrencyConfUpdateModal />
    </CurrencyConfContext.Provider>
  );
};
