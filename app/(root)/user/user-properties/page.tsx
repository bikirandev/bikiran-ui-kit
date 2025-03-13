import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UserPropertiesPage from "@/bikiran/components/user-properties/UserPropertiesPage";

export const metadata = {
  title: "User Properties | Bikiran Admin",
  description: "Bikiran Admin User Properties Manage Page",
};
const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UserPropertiesPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
