import React, { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UserListPage from "@/bikiran/components/user-list/UserListPage";

export const metadata = {
  title: "User List | Bikiran Admin",
  description: "Bikiran Admin User List Page",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UserListPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
