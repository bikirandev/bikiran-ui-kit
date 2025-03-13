/* eslint-disable no-unused-vars */
import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TDomainPackagePayload } from "./DomainTypes";

export const ApiLoadDomainPricingData = async (
  currentUser: CurrentUser,
  query: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/domain/packages`, query)
      .get();
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

// Create Domain Package
export const ApiCreateDomainPackage = async (
  currentUser: CurrentUser,
  payload: TDomainPackagePayload
): Promise<TApiResponse<TDomainPackagePayload>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/domain/packages/create`)
      .post({ ...payload });

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
// Create Domain Package
export const ApiUpdateDomainPackage = async (
  currentUser: CurrentUser,
  packageId: string,
  payload: TDomainPackagePayload
): Promise<TApiResponse<TDomainPackagePayload>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/domain/packages/${packageId}/update`)
      .post({ ...payload });

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateDomainStatus = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  packageId: string,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/domain/packages/${packageId}/status-update`)
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
