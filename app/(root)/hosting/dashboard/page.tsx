import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import HostingDashboardPage from "@/bikiran/components/hosting-dashboard/HostingDashboardPage";
export const metadata = {
  title: "Hosting Dashboard | Bikiran Admin",
  description: "Bikiran Admin Hosting Dashboard Page",
};

const Page: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <HostingDashboardPage />
    </AuthPageWrapper>
  );
};

export default Page;
