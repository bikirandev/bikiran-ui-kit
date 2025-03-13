import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UserProjectsPage from "@/bikiran/components/user-projects/UserProjectsPage";

export const metadata = {
  title: "User Projects | Bikiran Admin",
  description: "Bikiran Admin User Projects List Page",
};
const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UserProjectsPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
