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
import { TEnConfig, TEnConfigResponse, TFilter } from "../enConfigTypes";
import ModalVendorUpdate from "../modals/ModalVendorUpdate";
import ModalTemplateUpdate from "../modals/template-update/ModalTemplateUpdate";
import ModalSendEmail from "../modals/ModalSendEmail";
import { useApi } from "@/bik-lib/context/api/ApiProvider";

type TContext = {
  configs: TEnConfig[];
  filters: TFilter;
  notFound: boolean;
};

const EnConfigContext = createContext<TContext | undefined>(undefined);

export const useEnConfig = () => {
  const context = useContext(EnConfigContext);
  return context as TContext;
};
const EnConfigProvider: FC<{
  children: ReactNode;
  query: Record<string, any>;
}> = ({ children, query }) => {
  const [pageData, setPageData] = useState<TEnConfigResponse | undefined>(
    undefined
  );

  const { get, reloadKey, reload } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      const queryPayload =
        Object.keys(query)?.length > 0
          ? query
          : {
              type: "auth",
            };
      get<TEnConfigResponse>(`/admin/notification/email/config`, queryPayload)
        .then(({ data }) => {
          if (data) {
            setPageData(data);
          }
        })
        .catch((err: Error) => {
          setPageData(undefined);
          console.log(err.message);
        });
    }
  }, [reloadKey, query]);

  useEffect(() => {
    reload();
  }, [query]);

  const value = useMemo(() => {
    return {
      configs: pageData?.configs || [],
      filters: pageData?.filters || { type: [], status: [], vendors: [] },
      notFound: reloadKey !== -1 && pageData === undefined,
    };
  }, [pageData, reloadKey]);
  return (
    <EnConfigContext.Provider value={value}>
      {children}
      <ModalVendorUpdate />
      <ModalTemplateUpdate />
      {/* <ModalTemplateUpdate /> */}
      {/* <ModalEmailTemplateUpdate /> */}
      <ModalSendEmail />
    </EnConfigContext.Provider>
  );
};

export default EnConfigProvider;
