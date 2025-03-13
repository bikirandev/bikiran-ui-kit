import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import AppDomainListPage from "@/bikiran/components/appocean-domains/AppDomainListPage";

export const metadata = {
  title: "Domains | Appocean | Bikiran Admin",
  description:
    "Manage and monitor all databases within Bikiran Admin. Easily access, configure, and optimize your hosted databases for better performance and security.",
};

const Page: FC = async () => {

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <AppDomainListPage  />
    </AuthPageWrapper>
  );
};

export default Page;
