import { TPagination } from "@/bik-lib/types/response";

export type TUserProp = {
  id: number;
  name: string;
  photoUrl: string;
  email: string;
  tfaEnabled: boolean;
  billingEnabled: boolean;
  status: string;
};
export type TUserResponse = {
  users: TUserProp[];
  status: string[];
  pagination: TPagination;
};
