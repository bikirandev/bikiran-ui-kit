import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TApiResponse } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";

export const ApiLoadPaymentMethods = async (
  currentUser: CurrentUser,
  query: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/gateway/configuration`, query)
      .get();

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

// payment method status update
export const ApiUpdatePaymentStatus = async (
  currentUser: CurrentUser,
  id: number,
  status: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/gateway/configuration/${id}/update-status`,
        { status }
      )
      .put({ status });

    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
// Upload application logo
export const ApiUploadLogo = async (authInfo: TAuthInfo, icon: FormData) => {
  try {
    const response = await AxiosAuth.currentUserAuth(authInfo)
      .setUrl(`${getApi2Url()}/upload`)
      .put(icon, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

    if (response.data.error === true) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (ex) {
    throw ex;
  }
};
// payment method status update
export const ApiUpdatePaymentIcon = async (
  currentUser: CurrentUser,
  id: number,
  iconUrl: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/gateway/configuration/${id}/update-icon`, {
        iconUrl,
      })
      .put({ iconUrl });

    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiReorderPayment = async (
  currentUser: CurrentUser,
  formData: any,
  currency: any
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/gateway/configuration/${currency}/update-sequence`
      )
      .put(formData);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
// payment method status update
export const ApiUpdateBasicInformation = async (
  currentUser: CurrentUser,
  id: number,
  formData: any
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/gateway/configuration/${id}/update-basic-information`,
        { formData }
      )
      .put(formData);

    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
