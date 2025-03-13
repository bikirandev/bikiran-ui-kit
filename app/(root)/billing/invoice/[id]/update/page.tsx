import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import InvoiceManagePage from "@/bikiran/components/billing-invoice-manage/InvoiceManagePage";

const Page: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <InvoiceManagePage />
    </AuthPageWrapper>
  );
};

export default Page;
