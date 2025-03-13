import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import CurrencyConfPage from "@/bikiran/components/manage-currency/CurrencyConfPage";
import React, { FC } from "react";

const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <CurrencyConfPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
