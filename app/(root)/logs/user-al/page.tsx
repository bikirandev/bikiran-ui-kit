import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import UserActivityLogsPage from "@/bikiran/components/user-activity-logs/UserActivityLogsPage";
import React, { FC } from "react";

export const metadata = {
  title: "User Activity Logs | Bikiran Admin",
  description: "Bikiran Admin User Activity Logs Page",
};

const P: FC<{
  searchParams: Promise<Record<string, any>>;
}> = async ({ searchParams }) => {
  const query = await searchParams;
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <UserActivityLogsPage query={query} />
    </AuthPageWrapper>
  );
};

export default P;
