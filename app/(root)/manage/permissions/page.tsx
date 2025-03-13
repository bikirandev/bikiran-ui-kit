import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import ManagePermissionPage from "@/bikiran/components/manage-permission/ManagePermissionPage";
import { FC } from "react";

const P: FC = () => {
  return (
    <AuthPageWrapper authFn={useAuth2}>
      <ManagePermissionPage />
    </AuthPageWrapper>
  );
};

export default P;
