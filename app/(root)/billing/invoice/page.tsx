import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import InvoiceListPage from "@/bikiran/components/billing-invoice/InvoiceListPage";
import { FC } from "react";

export const metadata = {
  title: "Invoice | Bikiran Invoices",
  description: "Bikiran Invoices is a Bikiran Invoice Management System",
};

const Page: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <InvoiceListPage query={query} />
    </AuthPageWrapper>
  );
};

export default Page;
