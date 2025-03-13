import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import HostingListPage from "@/bikiran/components/hosting-list/HostingListPage";

export const metadata = {
  title: "Hosting List | Bikiran Admin",
  description: "Bikiran Admin Hosting List Page",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <HostingListPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
