import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import SupportChatPage from "@/bikiran/components/admin-support-info/SupportChatPage";
import React, { FC } from "react";

const Page: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <SupportChatPage />
    </AuthPageWrapper>
  );
};

export default Page;
