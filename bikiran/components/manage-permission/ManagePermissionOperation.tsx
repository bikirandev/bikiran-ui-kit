import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TPermissionChangeStatusPayload } from "./dummydata";

export const ApiLoadPermissionData = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/founder/permission`)
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

// API for change permission status
export const ApiPermissionStatusChange = async (
  currentUser: CurrentUser,
  permissionId: number,
  payload: TPermissionChangeStatusPayload
): Promise<any> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(
      `${getApi2Url()}/admin/founder / permission / ${permissionId} / edit - status
`
    )
    .put(payload);

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};
// API for Add permission
export const ApiAddPermission = async (
  currentUser: CurrentUser,
  payload: any
): Promise<any> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/admin/founder/permission/add`)
    .put(payload);

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};

export const ApiPermissionRevoke = async (
  currentUser: CurrentUser,
  permissionId: number
): Promise<any> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(currentUser)
    .setUrl(`${getApi2Url()}/admin/founder/permission/${permissionId}/revoke`)
    .put({});

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};
