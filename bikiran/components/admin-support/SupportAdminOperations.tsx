import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TCreateTicket, TTicketData } from "./SupportTypes";

type ApiResponse<T> = {
    error: number;
    message?: string;
    data?: T;
};

// Creates a  ticket for the user

export const ApiAdminCreateTicket = (
    currentUser: CurrentUser,
    formData: TCreateTicket
): Promise<ApiResponse<any>> =>
    new Promise((resolve, reject) => {
        AxiosAuth.currentUserAuth(currentUser)
            .setUrl(`${getApi2Url()}/admin/ticket/create`)
            .post(formData)
            .then(({ data }: { data: ApiResponse<any> }) => {
                if (!data.error) {
                    resolve(data);
                } else {
                    reject(new Error(data.message));
                }
            })
            .catch((err) => {
                reject(new Error(err?.message || "Failed to create ticket"));
            });
    });
// Fetches all the tickets of the user

export const ApiAdminGetTickets = (
    currentUser: CurrentUser
): Promise<ApiResponse<any>> =>
    new Promise((resolve, reject) => {
        AxiosAuth.currentUserAuth(currentUser)
            .setUrl(`${getApi2Url()}/admin/ticket`)
            .get()
            .then(({ data }: { data: ApiResponse<any> }) => {
                if (!data.error) {
                    resolve(data);
                } else {
                    reject(data.message);
                }
            })
            .catch((err) => {
                reject(err);
            });
    });


// get Projects for the user

export const ApiAdminLoadProjectData = async (
    currentUser: CurrentUser,
): Promise<ApiResponse<any>> => {
    try {
        const {
            data,
        }: {
            data: ApiResponse<any>;
        } = await AxiosAuth.currentUserAuth(currentUser)
            .setUrl(`${getApi2Url()}/project`)
            .get();
        if (data.error) {
            throw new Error(data.message);
        }

        return data;
    } catch (err) {
        throw err;
    }
};

// get ticket details and messages

export const ApiAdminGetTicketInfo = async (
    currentUser: CurrentUser,
    ticketId: number,
): Promise<ApiResponse<any>> => {
    try {
        const {
            data,
        }: {
            data: ApiResponse<any>;
        } = await AxiosAuth.currentUserAuth(currentUser)
            .setUrl(`${getApi2Url()}/admin/ticket/${ticketId}/ticket-info`)
            .get();
        if (data.error) {
            throw new Error(data.message);
        }

        return data;
    } catch (err) {
        throw err;
    }
};

// Post new massage regarding the ticket

export const ApiAdminSentReply = (
    currentUser: CurrentUser,
    formData: FormData,
    ticketId: number,
): Promise<ApiResponse<any>> =>
    new Promise((resolve, reject) => {
        AxiosAuth.currentUserAuth(currentUser)
            .setUrl(`${getApi2Url()}/admin/ticket/${ticketId}/reply`)
            .post(formData)
            .then(({ data }: { data: ApiResponse<any> }) => {
                if (!data.error) {
                    resolve(data);
                } else {
                    reject(new Error(data.message));
                }
            })
            .catch((err) => {
                reject(new Error(err?.message || "Failed to Reply"));
            });
    });