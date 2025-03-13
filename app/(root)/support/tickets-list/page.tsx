import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import SupportAdminPage from "@/bikiran/components/admin-support/SupportAdminPage";
import React, { FC } from "react";

const P: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <SupportAdminPage />
    </AuthPageWrapper>
  );
};

export default P;
