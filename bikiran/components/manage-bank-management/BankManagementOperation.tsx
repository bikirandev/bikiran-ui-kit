import { TApiResponse } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import {
  TBankResponse,
  TAddAccountPayload,
  TUpdateAccountStPayload,
} from "./bankManagementTypes";

export const ApiLoadBankManagement = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TBankResponse>) => void,
  query: Record<string, any>
): Promise<TApiResponse<TBankResponse>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TBankResponse>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/config/bank-account`, query)
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

export const ApiAddAccount = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  payload: TAddAccountPayload
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/config/bank-account/create`)
      .post(payload);

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateAccount = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  facId: number,
  payload: TAddAccountPayload
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/config/bank-account/${facId}/update`)
      .put(payload);

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateBankStatus = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  facId: number,
  payload: TUpdateAccountStPayload
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/config/bank-account/${facId}/update-status`
      )
      .put(payload);

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
