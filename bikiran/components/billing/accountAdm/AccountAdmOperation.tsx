import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";

export const ApiLoadAccountAdmData = async (
  currentUser: CurrentUser,
  query: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/billing/account/type-user`, query)
      .get();
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiUpdateStatus = async (
  currentUser: CurrentUser,
  packageId: string,
  payload: string
): Promise<TApiResponse<{}>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{}>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/billing/${packageId}/change-status`)
      .post(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiGetCreditNoteInfo = async (
  currentUser: CurrentUser,
  creditAccountId: number
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/billing/account/${creditAccountId}/credit-note-account-info`
      )
      .get();
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiGetDebitNoteInfo = async (
  currentUser: CurrentUser,
  debitAccountId: number
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/billing/account/${debitAccountId}/debit-note-account-info`
      )
      .get();
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiCreateCreditNote = async (
  currentUser: CurrentUser,
  accountId: number,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/billing/account/${accountId}/credit-note`)
      .post(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiCreateDebitNote = async (
  currentUser: CurrentUser,
  accountId: number,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/billing/account/${accountId}/debit-note`)
      .post(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
