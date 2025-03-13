import { FC } from "react";
import RenewPage from "@/bikiran/components/renew/RenewPage";
import AuthPageWrapper from "@/bik-lib/context/auth/AuthPageWrapper";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";

export const metadata = {
    title: "Renew | Bikiran Admin",
    description: "Bikiran Admin Renew Page",
};

type Props = {
    "subscription-id": string;
    asset: string;
};

const P: FC<{ searchParams: Promise<Props> }> = async ({ searchParams }) => {
    const { "subscription-id": subscriptionId, asset } = await searchParams;

    return (
        <AuthPageWrapper authFn={useAuth2}>
            <RenewPage
                subscriptionId={parseInt(subscriptionId, 10) || 0}
                asset={asset || ""}
            />
        </AuthPageWrapper>
    );
};

export default P;
