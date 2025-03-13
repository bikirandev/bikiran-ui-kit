import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import DomainPricingPage from "@/bikiran/components/domain-pricing/DomainPricingPage";

export const metadata = {
  title: "Domain Pricing | Bikiran Admin",
  description: "Bikiran Admin Domain Pricing Page",
};

const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <DomainPricingPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
