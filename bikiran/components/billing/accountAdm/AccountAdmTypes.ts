import { TPagination } from "@/bik-lib/types/response";

export interface IAccountAdmContext {
  data: TAccountAdmData[] | null | undefined;
  pagination: TPagination;
  reFetching: boolean;
  reFetch: () => void;
  filters: TAccountFilters;
}

export type TAccountAdmData = {
  id: number;
  currency: string;
  type: string;
  title: string;
  note: string;
  isPrimary: boolean;
  status: string;
  creator: number;
  timeCreated: number;
  timeUpdated: number;
  totalDebit: number;
  totalCredit: number;
  balance: number;
  user: User;
};

type User = {
  id: number;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
  status: string;
  userProfile: any;
  primaryIds: any[];
  primaryProjectId: number;
};

export type TCreditInfo = () => {
  creditSide: any;
  debitSide: any;
};

export type TDebitCredit = {
  user: User;
  fac: {
    facId: number;
    facType: string;
    credit: number;
    debit: number;
    balance: number;
    currency: string;
  };
};

export type TAccountFilters ={
  status: string[];
  projectId: string;
  userId: string;
  currency: [{
    currency : string;
    title: string;
  }];
}