import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UnlocatedActivityLogsPage from "@/bikiran/components/unlocated-activity-log/UnlocatedActivityLogsPage";
import React, { FC } from "react";

const P: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UnlocatedActivityLogsPage />
    </AuthPageWrapper>
  );
};

export default P;
