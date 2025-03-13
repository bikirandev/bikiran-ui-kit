import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TRenewData, TRenewProductPayload } from "./renewProductTypes";

export const ApiLoadRenewData = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TRenewData>) => void,
  query: Record<string, any>
) => {
  const {
    data,
  }: {
    data: TApiResponse<TRenewData>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/renew`, query)
    .get({});
  chkLoginReq(data);
  if (data.error) {
    throw new Error(data.message);
  }

  return data;
};

export const ApiCreateRenewInvoice = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  payload: TRenewProductPayload
) => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/renew/create-invoice`)
    .post(payload);
  chkLoginReq(data);
  if (data.error) {
    throw new Error(data.message);
  }

  return data;
};
