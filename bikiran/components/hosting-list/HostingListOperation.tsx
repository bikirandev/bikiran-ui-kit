/* eslint-disable no-unused-vars */
import { TApiResponse } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import {
  TCpServers,
  TCurrency,
  THostingCreatePayload,
  THostingListData,
  THostingListItem,
  TPackage,
} from "./hostingListType";

export const ApiLoadHostingList = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<THostingListData>) => void,
  query: Record<string, any>
): Promise<TApiResponse<THostingListData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<THostingListData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/hosting/manage`, query)
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
export const ApiCreateHostingUser = async (
  currentUser: CurrentUser,
  payload: THostingCreatePayload
): Promise<TApiResponse<THostingCreatePayload>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<THostingCreatePayload>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/hosting/manage/add-cpanel-hosting`)
      .post(payload);

    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateHostingBasic = async (
  currentUser: CurrentUser,
  subscriptionId: string,
  title: string,
  domainName: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/hosting/manage/${subscriptionId}/update-basic`
      )
      .put({ title, domainName });

    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiUpdateHostingPackage = async (
  currentUser: CurrentUser,
  subscriptionId: string,
  packageId: number
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/${subscriptionId}/upgrade-package`, {
        packageId,
      })
      .put({ packageId });

    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiChangeHostingOwnership = async (
  currentUser: CurrentUser,
  subscriptionId: string,
  newUserId: number
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/hosting/manage/${subscriptionId}/change-ownership`
      )
      .put({ newUserId });

    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiUpdateHostingPricing = async (
  currentUser: CurrentUser,
  subscriptionId: string,
  payload: any
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/hosting/manage/${subscriptionId}/update-pricing`
      )
      .put({ ...payload });
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiUpdateHostingStatus = async (
  currentUser: CurrentUser,
  subscriptionId: string,
  statusPayload: { status: string }
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/hosting/manage/${subscriptionId}/update-status`
      )
      .put(statusPayload);

    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiSyncDown = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  subscriptionId: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/hosting/manage/${subscriptionId}/sync-down`
      )
      .put({});

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
