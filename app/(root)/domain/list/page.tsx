import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import DomainListPage from "@/bikiran/components/domain-list/DomainListPage";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";

export const metadata = {
  title: "Domain List | Bikiran Admin",
  description: "Bikiran Admin Domain List Page",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;

  return (
    <AuthPageWrapper authFn={useAuth2}>
      <DomainListPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
