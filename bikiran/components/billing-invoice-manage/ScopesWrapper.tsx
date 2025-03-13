import { FC, ReactNode } from "react";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";

const ScopesWrapper: FC<{
  scope: string;
  children: ReactNode;
}> = ({ children, scope }) => {
  const { scopes, loading } = useInvoiceInfo();

  const isAvailable = scopes?.indexOf(scope) > -1;

  if (!isAvailable && !loading) return null;

  return children;
};

export default ScopesWrapper;
