import { FC } from "react";
import DomainDashboard from "@/bikiran/components/domain-dashboard/DomainDashboard";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";

export const metadata = {
  title: "Domain Dashboard | Bikiran Admin",
  description: "Bikiran Admin Domain Dashboard Page",
};

const Page: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <DomainDashboard />
    </AuthPageWrapper>
  );
};

export default Page;
