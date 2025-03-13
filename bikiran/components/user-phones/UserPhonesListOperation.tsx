/* eslint-disable no-unused-vars */
import { TApiResponse, TPagination } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TUserPhonesItem } from "./userPhonesType";

export const ApiLoadUserPhonesList = async (
  currentUser: CurrentUser,
  chkLoginReq: (
    data: TApiResponse<{
      contacts: TUserPhonesItem[];
      status: string[];
      pagination: TPagination;
    }>
  ) => void,
  query: Record<string, any>
): Promise<
  TApiResponse<{
    contacts: TUserPhonesItem[];
    status: string[];
    pagination: TPagination;
  }>
> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{
        contacts: TUserPhonesItem[];
        status: string[];
        pagination: TPagination;
      }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/user/phone`, query)
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
export const ApiLoadUserPhoneAdd = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<{ contacts: TUserPhonesItem[] }>) => void,
  userId: number,
  phone: string
): Promise<TApiResponse<{ contacts: TUserPhonesItem[] }>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{ contacts: TUserPhonesItem[] }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/user/phone/${userId}/add`)
      .post({ phone });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiUpdateUserPhoneStatus = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<{}>) => void,
  providerId: number,
  payload: any
): Promise<TApiResponse<{}>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{}>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/user/phone/${providerId}/update-status`)
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
