import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import AppLoadBalancerPage from "@/bikiran/components/appocean-load-balancer/AppLoadBalancerPage";

export const metadata = {
  title: "Load Balancer | Appocean | Bikiran Admin",
  description:
    "Manage and monitor all databases within Bikiran Admin. Easily access, configure, and optimize your hosted databases for better performance and security.",
};

const Page: FC = async () => {

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <AppLoadBalancerPage  />
    </AuthPageWrapper>
  );
};

export default Page;
