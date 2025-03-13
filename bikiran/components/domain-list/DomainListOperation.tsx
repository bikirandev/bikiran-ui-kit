/* eslint-disable no-unused-vars */
import { TApiResponse, TPagination } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TCurrency, TDomainListItem, TDomainPackage } from "./domainListTypes";

export const ApiLoadDomainList = async (
  currentUser: CurrentUser,
  chkLoginReq: (
    data: TApiResponse<{
      currencies: TCurrency[];
      domains: TDomainListItem[];
      pagination: TPagination;
      status: string[];
    }>
  ) => void,
  query: Record<string, any>
): Promise<
  TApiResponse<{
    currencies: TCurrency[];
    domains: TDomainListItem[];
    pagination: TPagination;
    status: string[];
  }>
> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{
        currencies: TCurrency[];
        domains: TDomainListItem[];
        pagination: TPagination;
        status: string[];
      }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/domain/manage`, query)
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

export const ApiSearchDomain = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TDomainPackage>) => void,
  domain: string,
  currency: string,
  rate: string
): Promise<TApiResponse<TDomainPackage>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TDomainPackage>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/domain/manage/package-info`, {
        domain,
        currency,
        rate,
      })
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

export const ApiAddDomain = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  formData: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/domain/manage/add-domain`)
      .post(formData);

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdatePricing = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  subscriptionId: string,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/domain/manage/${subscriptionId}/update-pricing`
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

export const ApiUpdateTitle = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  subscriptionId: string,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/domain/manage/${subscriptionId}/update-basic`
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

export const ApiChangeOwnership = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  subscriptionId: string,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/domain/manage/${subscriptionId}/change-ownership`
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
export const ApiChangeStatus = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  subscriptionId: string,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/domain/manage/${subscriptionId}/change-status`
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
      .setUrl(`${getApi2Url()}/admin/domain/manage/${subscriptionId}/sync-down`)
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
