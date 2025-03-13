/* eslint-disable no-unused-vars */
import { TApiResponse, TPagination } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TUserProjectsItem } from "./userProjectsType";

export const ApiLoadUserProjectsList = async (
  currentUser: CurrentUser,
  chkLoginReq: (
    data: TApiResponse<{
      projects: TUserProjectsItem[];
      status: [];
      pagination: TPagination;
    }>
  ) => void,
  query: Record<string, any>
): Promise<
  TApiResponse<{
    projects: TUserProjectsItem[];
    status: [];
    pagination: TPagination;
  }>
> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{
        projects: TUserProjectsItem[];
        status: [];
        pagination: TPagination;
      }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/user/project`, query)
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

export const ApiLoadUserProjectsAdd = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<{ contacts: TUserProjectsItem[] }>) => void,
  userId: number,
  phone: string
): Promise<TApiResponse<{ contacts: TUserProjectsItem[] }>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{ contacts: TUserProjectsItem[] }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/user/Projects/${userId}/add`)
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
export const ApiUpdateUserProjectsStatus = async (
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
      .setUrl(`${getApi2Url()}/admin/user/Projects/${providerId}/update-status`)
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
