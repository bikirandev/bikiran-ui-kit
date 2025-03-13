/* eslint-disable no-unused-vars */
import { TApiResponse, TPagination } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TUserEmailsItem } from "./userEmailsType";

export const ApiLoadUserEmailsList = async (
  currentUser: CurrentUser,
  chkLoginReq: (
    data: TApiResponse<{
      contacts: TUserEmailsItem[];
      status: string[];
      pagination: TPagination;
    }>
  ) => void,
  query: Record<string, any>
): Promise<
  TApiResponse<{
    contacts: TUserEmailsItem[];
    status: string[];
    pagination: TPagination;
  }>
> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{
        contacts: TUserEmailsItem[];
        status: string[];
        pagination: TPagination;
      }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/user/email`, query)
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
export const ApiAddUserEmail = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<{}>) => void,
  userId: number,
  email: string
): Promise<TApiResponse<{}>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{}>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/user/email/${userId}/add`)
      .post({ email });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateUserEmailStatus = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  providerId: string,
  payload: any
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/user/email/${providerId}/update-status`)
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
