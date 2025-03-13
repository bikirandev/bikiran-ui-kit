import React, { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UserOverviewPage from "@/bikiran/components/user-overview/UserOverviewPage";

export const metadata = {
  title: "User Overview | Bikiran Admin",
  description: "Bikiran Admin User Overview Page",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UserOverviewPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
