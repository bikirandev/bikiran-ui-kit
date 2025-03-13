"use client";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiGetApplicationInfo } from "./operation/ApplicationInfoOperation";
type TApplicationInfoContext = {
  applicationData:
  | {
    application: Record<string, any>;
    docsPage: [];
  }
  | null
  | Record<string, any>;
  reloadKey: number;
  handleReload: () => void;
};

const ApplicationInfoContext = createContext<TApplicationInfoContext>({
  applicationData: {
    application: {},
    docsPage: [],
  },
  reloadKey: 0,
  handleReload: () => { },
});

export const useApplicationInfo = () => useContext(ApplicationInfoContext);

type Props = {
  children: ReactNode;
  id: any;
};

const ApplicationInfoProvider = ({ children, id }: Props) => {
  const { setMessage } = useTemplate();
  const { authInfo } = useAuth2();
  const [reloadKey, setReloadKey] = useState(0);
  const [applicationData, setApplicationData] = useState<null | object>(null);

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };


  // // Fetch application data
  useEffect(() => {
    setApplicationData(null);
    ApiGetApplicationInfo(authInfo)
      .then(({ data }) => {
        setApplicationData(data);
      })
      .catch((err: Error) => {
        setMessage(err);
      });
  }, [authInfo, reloadKey]);

  const value = useMemo(() => {
    return {
      applicationData,
      reloadKey,
      handleReload,
    };
  }, [reloadKey, applicationData]);

  return (
    <ApplicationInfoContext.Provider value={value}>
      {children}
    </ApplicationInfoContext.Provider>
  );
};

export default ApplicationInfoProvider;
