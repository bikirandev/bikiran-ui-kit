import { TApiResponse } from "@/bik-lib/types/response";
import { getApi2Url } from "@/bik-lib/utils/Env";
import AxiosAuth from "@/bik-lib/utils/AxiosAPI";
import { TAuthInfo } from "@/bik-lib/context/auth/authTypes";
import { TExecutionData } from "./admExecutionType";

// API for fetch invoice execution data
export const ApiLoadAdmExecutionData = async (
  authInfo: TAuthInfo,
  query: Record<string, any>
): Promise<TApiResponse<TExecutionData[]>> => {
  const {
    data,
  }: {
    data: TApiResponse<TExecutionData[]>;
  } = await AxiosAuth.currentUserAuth(authInfo)
    .setUrl(`${getApi2Url()}/admin/execution`, query)
    .get({});

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};

// API for execute
export const ApiExecuteData = async (
  authInfo: TAuthInfo,
  execRef: string,
  executionId: number
): Promise<TApiResponse<any>> => {
  const {
    data,
  }: {
    data: TApiResponse<any>;
  } = await AxiosAuth.currentUserAuth(authInfo)
    .setUrl(`${getApi2Url()}/admin/execution/${execRef}/${executionId}`)
    .post({ executionId, execRef });

  if (data.error) {
    throw new Error(data.message);
  }
  return data;
};
