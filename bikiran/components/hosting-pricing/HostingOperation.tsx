/* eslint-disable no-unused-vars */
import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { THostingPkg } from "./HostingTypes";

export const ApiLoadHostingPricingData = async (
  currentUser: CurrentUser,
  query: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/hosting/packages`, query)
      .get();

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

// Create Hosting Package
export const ApiCreateHostingPackage = async (
  currentUser: CurrentUser,
  payload: THostingPkg
): Promise<TApiResponse<THostingPkg>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<THostingPkg>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/hosting/packages/create`)
      .post(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
// Delete Hosting Package
export const ApiDeleteHostingPackage = async (
  currentUser: CurrentUser,
  packageId: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/hosting/packages/${packageId}/delete`)
      .delete();

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
// Update Hosting Package
export const ApiUpdateHostingPackage = async (
  currentUser: CurrentUser,
  packageId: string,
  payload: THostingPkg
): Promise<TApiResponse<THostingPkg>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<THostingPkg>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/hosting/packages/${packageId}/update`)
      .post(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
// Update Status update Package
export const ApiUpdateHostingPackageStatus = async (
  currentUser: CurrentUser,
  packageId: string,
  payload: THostingPkg
): Promise<TApiResponse<THostingPkg>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<THostingPkg>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/hosting/packages/${packageId}/change-status`
      )
      .post(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
