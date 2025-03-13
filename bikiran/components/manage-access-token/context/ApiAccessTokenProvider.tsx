/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  MouseEvent,
  FC,
} from "react";

import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiLoadAccessTokens } from "../ApiAccessTokenOperation";
import ModalCreateToken from "../modals/ModalCreateToken";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";

// Define types for the context and provider props
interface AccessTokenContextType {
  loading?: boolean;
  reload?: () => void;

  accessTokenData: AccessTokenDataType;
}

interface ApiAccessTokenProviderProps {
  children: ReactNode;
}

interface AccessTokenDataType {
  id?: string;
  tokenList?: string[];
  [key: string]: any;
}

const ApiAccessTokenContext = createContext<AccessTokenContextType>({
  loading: false,
  reload: () => {},
  accessTokenData: [],
});

export const useAccessToken = () => {
  const context = useContext(ApiAccessTokenContext);

  return context;
};

const ApiAccessTokenProvider: FC<ApiAccessTokenProviderProps> = ({
  children,
}) => {
  const { setMessage, setConfirm, setTemplateLoading } = useTemplate();
  const [reloadKey, setReloadKey] = useState(0);
  const [accessTokenData, setAccessTokenData] = useState<AccessTokenDataType>({
    tokenList: [],
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { authInfo } = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      ApiLoadAccessTokens(authInfo)
        .then(({ data }) => {
          setAccessTokenData(data.hostingPackages);
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [authInfo, reloadKey]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };

    return {
      reload,
      loading: reloadKey === -1,
      accessTokenData,
    };
  }, [reloadKey, accessTokenData, setConfirm, setTemplateLoading, setMessage]);

  return (
    <ApiAccessTokenContext.Provider value={value}>
      {children}
      {<ModalCreateToken />}
    </ApiAccessTokenContext.Provider>
  );
};

export default ApiAccessTokenProvider;
