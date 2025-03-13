/* eslint-disable no-unused-vars */
import { TApiResponse, TPagination } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TStatus, TAppsDatabaseListItem } from "./AppsDatabaseListType";

export const ApiLoadAppsDatabaseList = async (
  currentUser: CurrentUser,
  chkLoginReq: (
    data: TApiResponse<{
      database: TAppsDatabaseListItem[];
      status: TStatus[];
      pagination: TPagination;
    }>
  ) => void,
  query: Record<string, any>
): Promise<
  TApiResponse<{
    database: TAppsDatabaseListItem[];
    status: TStatus[];
    pagination: TPagination;
  }>
> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{
        database: TAppsDatabaseListItem[];
        status: TStatus[];
        pagination: TPagination;
      }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/appOcean/apps/database`, query)
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
