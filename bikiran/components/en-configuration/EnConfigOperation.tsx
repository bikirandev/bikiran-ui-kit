import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";

// API to upload email template
export const ApiUploadEmail = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  key: string,
  payload: FormData
): Promise<TApiResponse<any>> => {
  try {
    const { data }: { data: TApiResponse<any> } =
      await AxiosAuth.currentUserAuth(currentUser)
        .setUrl(
          `${getApi2Url()}/admin/notification/email/config/${key}/upload-html-template`
        )
        .put(payload, { headers: { "Content-Type": "multipart/form-data" } });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
