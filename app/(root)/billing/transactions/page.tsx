import React, { FC } from "react";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import TransactionPage from "@/bikiran/components/billing/transactions/TransactionPage";

export const metadata = {
  title: "Transactions | Bikiran Transactions",
  description:
    "Bikiran Transactions is a Bikiran Transactions Management System",
};

const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <TransactionPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
