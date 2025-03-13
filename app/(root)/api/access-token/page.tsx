import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import ApiAccessTokenPage from "@/bikiran/components/manage-access-token/ApiAccessTokenPage";
import React, { FC } from "react";

const P: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <ApiAccessTokenPage />
    </AuthPageWrapper>
  );
};

export default P;
