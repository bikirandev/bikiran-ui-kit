/* eslint-disable no-unused-vars */
import { TApiResponse } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import {
  TEnvUpdate,
  TServerCreatePayload,
  TServerData,
} from "./ManageServerType";

export const ApiLoadServerData = async (
  currentUser: CurrentUser,
  chkLoginReq: (
    data: TApiResponse<{
      servers: TServerData[];
      serverTypes: string[];
      environments: TEnvUpdate[];
      serverStatus: string[];
    }>
  ) => void,
  query: Record<string, any>
): Promise<
  TApiResponse<{
    servers: TServerData[];
    serverTypes: string[];
    environments: TEnvUpdate[];
    serverStatus: string[];
  }>
> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{
        servers: TServerData[];
        serverTypes: string[];
        environments: TEnvUpdate[];
        serverStatus: string[];
      }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/server`, query)
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

export const ApiLoadServerDetails = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  serverId: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/server/${serverId}/server-details`)
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

export const ApiCreateServer = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TServerCreatePayload>) => void,
  payload: TServerCreatePayload
): Promise<TApiResponse<TServerCreatePayload>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/server/create`)
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
export const ApiUpdateServer = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TServerCreatePayload>) => void,
  serverId: string,
  payload: TServerCreatePayload
): Promise<TApiResponse<TServerCreatePayload>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/server/${serverId}/update`)
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

export const ApiUpdateServerStatus = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  serverId: string,
  status: string,
  note: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/server/${serverId}/update-status`)
      .put({ status, note });
    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateServerEnvironment = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  serverId: string,
  environment: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/server/${serverId}/update-environment`, {
        environment,
      })
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
