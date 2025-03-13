import { getApi2Url } from "@/bik-lib/utils/Env";
import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TInvoiceData } from "@/bik-lib/types/invoice";
import { TPayment } from "./invoiceManageTypes";

export const ApiLoadInvoiceInfo = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
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

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiActiveInvoice = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  invoiceId: string
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/make-active`)
      .put({ invoiceId });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiReopenInvoice = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: string
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/re-open`)
      .put({ invoiceId });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiDeleteInvoice = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: string
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/delete`)
      .put({ invoiceId });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateInvoiceCurrency = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: string,
  payload: { currency: string; rate: number }
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/update-currency`, {
        invoiceId,
      })
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

export const ApiUpdateDate = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: string,
  payload: {
    dateIssue: string;
    dateDue: string;
  }
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/update-dates`, {
        invoiceId,
      })
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

export const ApiUpdateInvoiceTitle = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: string,
  title: string
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/update-title`)
      .put({ title });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateInvoiceUser = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: string,
  userId: number
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/change-ownership`)
      .put({ newUserId: userId });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};

// Add payment
export const ApiAddPayment = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: string,
  payload: TPayment
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice-payment/${invoiceId}/add-payment`)
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

// Vat payment
export const ApiVatPayment = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: string,
  payload: TPayment
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice-payment/${invoiceId}/vat-payment`)
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

// Refund payment
export const ApiRefundPayment = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: number,
  payload: TPayment
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/invoice-payment/${invoiceId}/refund-payment`,
        { invoiceId }
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

// Refund vat payment
export const ApiRefundVatPayment = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TInvoiceData>) => void,
  invoiceId: number
): Promise<TApiResponse<TInvoiceData>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TInvoiceData>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/invoice-payment/${invoiceId}/refund-vat-payment`,
        { invoiceId }
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

export const ApiInvoiceAddProduct = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  api: string,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}${api}`)
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

export const ApiInvoiceRemoveItem = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  invoiceId: number,
  itemId: number
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/invoice/${invoiceId}/delete-item/${itemId}`
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

export const ApiInvoiceUpdate = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  api: string,
  payLoad: any
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}${api}`)
      .put(payLoad);

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }
    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiCreateInvoiceCreditNote = async (
  currentUser: CurrentUser,
  invoiceId: number,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/invoice-payment/${invoiceId}/invoice-credit-note`
      )
      .put(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
export const ApiCreateInvoiceDebitNote = async (
  currentUser: CurrentUser,
  invoiceId: number,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(
        `${getApi2Url()}/admin/invoice-payment/${invoiceId}/invoice-debit-note`
      )
      .put(payload);

    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiInvoiceUpdateAddress = async (
  currentUser: CurrentUser,
  checkLoginReq: (data: TApiResponse<any>) => void,
  invoiceId: number,
  addressId: number,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/update-address`)
      .put(payload);

    checkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};

export const ApiUpdateInvoiceNote = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  invoiceId: number,
  payload: Record<string, any>
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/update-note`)
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

export const ApiResetInvoiceNote = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  invoiceId: number
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/reset-note`)
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

export const ApiDuplicateInvoice = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  invoiceId: string,
  types: string[]
): Promise<TApiResponse<any>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<any>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/invoice/${invoiceId}/duplicate`)
      .put({ types });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
