/* eslint-disable no-unused-vars */
import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import {
  TInvoiceCreatePayload,
  TInvoiceDataResponse,
} from "./InvoiceListTypes";

export const ApiLoadInvoiceData = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceDataResponse>) => void,
  query: Record<string, any>
): Promise<TApiResponse<TInvoiceDataResponse>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceDataResponse>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice`, query)
      // TODO : update path
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
export const ApiLoadInvoiceDetails = async (
  currentUser: CurrentUser,
  invoiceId: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/detail`)
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
export const ApiCreateInvoice = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<{}>) => void,
  payload: TInvoiceCreatePayload
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/create`)
      .post(payload);

    //check logged in or not
    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
