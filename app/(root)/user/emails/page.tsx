import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UserEmailsPage from "@/bikiran/components/user-emails/UserEmailsPage";

export const metadata = {
  title: "User Contracts | Bikiran Admin",
  description: "Bikiran Admin User List Page",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UserEmailsPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
