import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UserAddressPage from "@/bikiran/components/user-address/UserAddressPage";

export const metadata = {
  title: "User Address | Bikiran Admin",
  description: "Bikiran Admin User List Page",
};

const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UserAddressPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
