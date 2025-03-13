import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";

export const ApiLoadClientData = async (
  currentUser: CurrentUser,
  query: Record<string, any>
): Promise<TApiResponse<{ clients: []; status: string[] }>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{ clients: []; status: string[] }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/client`, query)
      .get();
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiClientStatusUpdate = async (
  currentUser: CurrentUser,
  clientId: number,
  status: string,
  note: string
): Promise<TApiResponse<{}>> => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/client/${clientId}/update-status`)
      .put({ status, note });

    if (response.data.error) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (err) {
    throw err;
  }
};

// Create application
export const ApiAddClientInfo = async (authInfo: TAuthInfo, formData: any) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/admin/client/create`)
      .post(formData);

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (ex) {
    throw ex;
  }
};

// Update application
export const ApiUpdateClientInfo = async (
  authInfo: TAuthInfo,
  clientId: string,
  formData: any
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/admin/client/${clientId}/update`)
      .put(formData);
    if (response.data.error === true) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (ex) {
    throw ex;
  }
};

// Upload application logo
export const ApiUploadClientLogo = async (
  authInfo: TAuthInfo,
  clientId: string,
  formData: any
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/admin/client/${clientId}/logo`)
      .put(formData, { headers: { "Content-Type": "multipart/form-data" } });

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (ex) {
    throw ex;
  }
};

// Delete client data
export const ApiDeleteClientData = async (
  authInfo: TAuthInfo,
  clientId: string
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/admin/client/${clientId}/delete`)
      .delete();

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (ex) {
    throw ex;
  }
};
