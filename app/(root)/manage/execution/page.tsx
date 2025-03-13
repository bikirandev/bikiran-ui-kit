import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import AdmExecutionPage from "@/bikiran/components/execution/AdmExecutionPage";
import { FC } from "react";

const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <AdmExecutionPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
