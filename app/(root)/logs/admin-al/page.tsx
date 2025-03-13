import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import AdminActivityLogsPage from "@/bikiran/components/admin-activity-log/AdminActivityLogsPage";
import React, { FC } from "react";

const P: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <AdminActivityLogsPage />
    </AuthPageWrapper>
  );
};

export default P;
