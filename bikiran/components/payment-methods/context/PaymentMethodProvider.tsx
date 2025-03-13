// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TState } from "@/bik-lib/types/event";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiLoadPaymentMethods } from "../PaymentMethodOperation";
import { TPaymentMethod } from "../PaymentMethodTypes";

type TPaymentContext = {
  data: TPaymentMethod;
  loading: boolean;
  reload: () => void;
  query?: Record<string, any>;
};

const PaymentContext = createContext<TPaymentContext>({
  data: {} as TPaymentMethod,
  loading: false,
  reload: () => {},
  query: {},
});

export const usePaymentMethod = () => {
  const context = useContext(PaymentContext);
  return context;
};

type TProps = {
  children: ReactNode;
  query: Record<string, any>;
};

const PaymentMethodProvider: FC<TProps> = ({ children, query }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TPaymentMethod>({
    gateways: [],
    filters: {
      statusOptions: [],
      currencyOptions: [],
    },
  });
  const { authInfo } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadPaymentMethods(authInfo, query)
        .then(({ data }) => {
          if (data) {
            setData(data);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey, query]);

  useEffect(() => {
    setReloadKey(-1);
  }, [query]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      data,
      loading: reloadKey === -1,
      reload: reload,
      query,
    };
  }, [data, reloadKey]);

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export default PaymentMethodProvider;
