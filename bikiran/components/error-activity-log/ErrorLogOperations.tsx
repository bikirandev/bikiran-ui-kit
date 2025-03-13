import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";

export const ApiLoadErrorLogs = async (
    currentUser: CurrentUser,
    chkLoginReq: (
        data: TApiResponse<any>
    ) => void,
): Promise<TApiResponse<any>> => {
    try {
        const {
            data,
        }: {
            data: TApiResponse<any>;
        } = await AxiosAuth.currentUserAuth(currentUser)
            .setUrl(`${getApi2Url()}/admin/logs/activity/error`)
            .get();

        chkLoginReq(data);
        if (data.error) {
            throw new Error(data.message);
        }

        return data;
    } catch (err) {
        throw err;
    }
};
