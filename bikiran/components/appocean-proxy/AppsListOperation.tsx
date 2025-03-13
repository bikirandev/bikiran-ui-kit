/* eslint-disable no-unused-vars */
import { TApiResponse, TPagination } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { TAppsProxyListItem, TStatus } from "./AppsProxyListType";

export const ApiLoadAppsProxyList = async (
  currentUser: CurrentUser,
  chkLoginReq: (
    data: TApiResponse<{
      proxy: TAppsProxyListItem[];
      status: TStatus[];
      pagination: TPagination;
    }>
  ) => void,
  query: Record<string, any>
): Promise<
  TApiResponse<{
    proxy: TAppsProxyListItem[];
    status: TStatus[];
    pagination: TPagination;
  }>
> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{
        proxy: TAppsProxyListItem[];
        status: TStatus[];
        pagination: TPagination;
      }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/appOcean/apps/proxy`, query)
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
