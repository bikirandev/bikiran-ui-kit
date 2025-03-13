import { TApiResponse } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TSupportResponse } from "./supportChatTypes";

export const ApiLoadTicketInfo = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<TSupportResponse>) => void,
  ticketId: number
): Promise<TApiResponse<TSupportResponse>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<TSupportResponse>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/ticket/${ticketId}/ticket-info`)
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

export const ApiSendReply = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<{}>) => void,
  ticketId: number,
  payload: {
    message: string;
    attachment: string[];
  }
): Promise<TApiResponse<{}>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{}>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/ticket/${ticketId}/reply`)
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

export const ApiUpdateTicketStatus = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<{}>) => void,
  ticketId: number,
  status: string
): Promise<TApiResponse<{}>> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{}>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/ticket/${ticketId}/${status}`)
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

export const ApiUploadImage = async (
  currentUser: CurrentUser,
  chkLoginReq: (data: TApiResponse<any>) => void,
  payload: any
): Promise<TApiResponse<any>> => {
  try {
    const { data }: { data: TApiResponse<any> } =
      await AxiosAuth.currentUserAuth(currentUser)
        .setUrl(`${getApi2Url()}/upload`)
        .put(payload, { headers: { "Content-Type": "multipart/form-data" } });

    chkLoginReq(data);
    if (data.error) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    throw err;
  }
};
