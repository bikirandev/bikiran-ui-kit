import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import AppProxyPage from "@/bikiran/components/appocean-proxy/AppProxyPage";

export const metadata = {
  title: "Proxy | Appocean | Bikiran Admin",
  description:
    "Manage and monitor all databases within Bikiran Admin. Easily access, configure, and optimize your hosted databases for better performance and security.",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <AppProxyPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
