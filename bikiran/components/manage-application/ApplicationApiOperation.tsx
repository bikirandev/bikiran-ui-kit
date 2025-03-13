import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { TApiResponse } from "@/bik-lib/types/response";
// import { TDataResponse } from "@/bikiran/types/DataResponseType";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";

// API for fetch application list
export const ApiApplicationList = async (
  currentUser: CurrentUser
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/application`)
      .get();
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
// Create application
export const ApiCreateApplication = async (
  authInfo: TAuthInfo,
  formData: any
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/admin/application`)
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
export const ApiUpdateApplication = async (
  authInfo: TAuthInfo,
  applicationId: "",
  uniqueName: string,
  formData: any
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/admin/application/${applicationId}/update-basic`)
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
export const ApiUploadApplicationLogo = async (
  authInfo: TAuthInfo,
  formData: any
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/upload`)
      .put(formData, { headers: { "Content-Type": "multipart/form-data" } });

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (ex) {
    throw ex;
  }
};

// Re-order application
export const ApiReorderApplication = async (
  authInfo: TAuthInfo,
  formData: any
) => {
  const response: any = await AxiosAuth.currentUserAuth(authInfo)
    .setUrl(`${getApi2Url()}/admin/application/update-sequence`)
    .put(formData);

  console.log("response", response);

  if (response.data.error === true) {
    throw new Error(response.data.message);
  }

  return response.data;
};

// Update status application
export const ApiUpdateStatusApplication = async (
  authInfo: TAuthInfo,
  applicationId: any,
  formData: any
) => {
  try {
    const response: any = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(
        `${getApi2Url()}/admin/application/${applicationId}/update-status`
      )
      .put(formData);
    if (response.data.error === true) {
      throw new Error(response.data.message);
    }
    return response.data;
  } catch (ex) {
    throw ex;
  }
};
