import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import AppStorageListPage from "@/bikiran/components/appocean-storage/AppStorageListPage";

export const metadata = {
  title: "Storage | Appocean | Bikiran Admin",
  description:
    "Manage and monitor all databases within Bikiran Admin. Easily access, configure, and optimize your hosted databases for better performance and security.",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <AppStorageListPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
