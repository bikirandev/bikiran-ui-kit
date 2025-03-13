import React, { FC } from "react";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import GatewayTransactionPage from "@/bikiran/components/billing/getway-transaction/GatewayTransactionPage";

export const metadata = {
  title: "Gateway-Transactions | Bikiran Gateway-Transactions",
  description:
    "Bikiran Gateway-Transactions is a Bikiran Gateway-Transaction Management System",
};

const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <GatewayTransactionPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
