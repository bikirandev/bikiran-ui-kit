import { FC } from "react";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import DomainDeletedListPage from "@/bikiran/components/domain-deleted/DomainDeletedListPage";

export const metadata = {
  title: "Deleted Domain List | Bikiran Admin",
  description: "Bikiran Admin Deleted Domain List Page",
};
const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <DomainDeletedListPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
