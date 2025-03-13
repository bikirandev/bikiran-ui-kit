import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import ProjectInvitationPage from "@/bikiran/components/manage-permission-invite/ProjectInvitationPage";
import { FC } from "react";

const P: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <ProjectInvitationPage />
    </AuthPageWrapper>
  );
};

export default P;
