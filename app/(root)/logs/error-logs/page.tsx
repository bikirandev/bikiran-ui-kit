import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import ErrorLogsPage from "@/bikiran/components/error-activity-log/ErrorLogsPage";
import React, { FC } from "react";

const P: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <ErrorLogsPage />
    </AuthPageWrapper>
  );
};

export default P;
