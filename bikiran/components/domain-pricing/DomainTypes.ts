export type TDomainPrice = {
  id: number;
  vendor: string;
  classKey: string;
  tld: string;
  price: number;
  promotionPrice: number;
  transferPrice: number;
  redemptionPrice: number;
  restorePrice: number;
  minDuration: number;
  defaultDuration: number;
  status: string;
};

export type TDomainPackagePayload = {
  promotionPrice: number;
  price: number;
  transferPrice: number;
  redemptionPrice: number;
  restorePrice: number;
  minDuration: number;
  defaultDuration: number;
  vendor: string;
};

export type TVendor = {
  id: string;
  vendorTitle: string;
  vendorDescription: string;
  website: string;
  partnerPortalUrl: string;
  customerPortalUrl: string;
};
