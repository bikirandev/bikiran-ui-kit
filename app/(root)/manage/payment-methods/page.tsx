import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import PaymentMethodsPage from "@/bikiran/components/payment-methods/PaymentMethodsPage";
import { FC } from "react";

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <PaymentMethodsPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
