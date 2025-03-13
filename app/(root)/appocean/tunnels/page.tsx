import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import AppTunnelPage from "@/bikiran/components/appocean-tunnels/AppTunnelPage";

export const metadata = {
  title: "Tunnels | Appocean | Bikiran Admin",
  description:
    "Manage and monitor all databases within Bikiran Admin. Easily access, configure, and optimize your hosted databases for better performance and security.",
};

const Page: FC = async () => {

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <AppTunnelPage  />
    </AuthPageWrapper>
  );
};

export default Page;
