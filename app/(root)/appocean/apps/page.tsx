import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import AppsLIstPage from "@/bikiran/components/appocean2/apps-list/AppsListPage";

export const metadata = {
  title: "Apps | Appocean | Bikiran Admin",
  description:
    "Manage and monitor all applications within Bikiran Admin. Easily access, configure, and optimize your hosted apps for better performance and security.",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <AppsLIstPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
