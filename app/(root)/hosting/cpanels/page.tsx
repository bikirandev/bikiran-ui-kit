import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import CPanelPage from "@/bikiran/components/hosting-cpanel/CPanelPage";

export const metadata = {
  title: "CPanels | Bikiran Admin",
  description: "Bikiran Admin Hosting List Page",
};

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<Record<string, any>>;
}) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <CPanelPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
