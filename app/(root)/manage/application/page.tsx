import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import ManageApplicationPage from "@/bikiran/components/manage-application/ManageApplicationPage";
import { FC } from "react";

const P: FC = () => {
    return (
        <AuthPageWrapper authFn={useAuth2} >
            <ManageApplicationPage />
        </AuthPageWrapper>
    );
};

export default P;
