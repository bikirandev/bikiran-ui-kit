export type TEmailUser = {
  displayName: string;
  email: string;
  id: number;
  phone: string;
  photoUrl: string;
  status: string;
  userProfile: any;
  primaryIds: number[];
  primaryProjectId: number;
};

export type TCPanel = {
  id: number;
  identity: string;
  identityType: string;
  isVerified: boolean;
  provider: string;
  status: string;
  isPrimary: boolean;
  user: TEmailUser;
  cPanel: {
    cpDomain: string;
    cpEmail: string;
    cpHostname: string;
    cpIp: string;
    cpIpType: string;
    cpNameservers: string;
    cpPackage: string;
    cpShell: boolean;
    cpUsername: string;
  };
  cpSuspention: {
    isSuspended: boolean;
    suspendNote: string;
    suspendTime: number;
  };
}[];
export type TFilter = {
  cpDomain: string;
  cpUsername: string;
  hostname: string[];
  status: string[];
};
