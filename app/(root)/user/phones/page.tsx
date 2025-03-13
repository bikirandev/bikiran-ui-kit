import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UserPhonesPage from "@/bikiran/components/user-phones/UserPhonesPage";

export const metadata = {
  title: "User Phones | Bikiran Admin",
  description: "Bikiran Admin User List Page",
};
const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UserPhonesPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
