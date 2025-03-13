import { TApiResponse, TPagination } from "@/bik-lib/types/response";
import AxiosAuth, { CurrentUser } from "@/bik-lib/utils/AxiosAPI";
import { getApi2Url } from "@/bik-lib/utils/Env";
import { TCPanel, TFilter } from "./CPanalType";

export const ApiLoadCPanal = async (
  currentUser: CurrentUser,
  chkLoginReq: (
    data: TApiResponse<{
      hostings: TCPanel[];
      filters: TFilter;
      pagination: TPagination;
    }>
  ) => void
): Promise<
  TApiResponse<{
    hostings: TCPanel[];
    filters: TFilter;
    pagination: TPagination;
  }>
> => {
  try {
    const {
      data,
    }: {
      data: TApiResponse<{
        hostings: TCPanel[];
        filters: TFilter;
        pagination: TPagination;
      }>;
    } = await AxiosAuth.currentUserAuth(currentUser)
      .setUrl(`${getApi2Url()}/admin/hosting/cp-manage`)
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
