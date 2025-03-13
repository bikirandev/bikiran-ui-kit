import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import HostingPricingPage from "@/bikiran/components/hosting-pricing/HostingPricingPage";

export const metadata = {
  title: "Hosting Pricing | Bikiran Admin",
  description: "Bikiran Admin Hosting Pricing Page",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <HostingPricingPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
