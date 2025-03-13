export type TShippingAddress = {
  name: string;
  organization: string;
  email: string;
  mobile: string;
  telephone: string;
  fax: string;
  line1: string;
  line2: string;
  line3: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
};

export type TBillingAddress = {
  name: string;
  organization: string;
  email: string;
  mobile: string;
  telephone: string;
  fax: string;
  line1: string;
  line2: string;
  line3: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
};

export type TInvoice = {
  id: number;
  customId: string;
  userId: number;
  projectId: number;
  billingId: number;
  invoiceTitle: string;
  localCurrency: string;
  convertRatio: number;
  paymentStatus: string;
  paymentTime: number;
  timeIssue: number;
  timeDue: number;
  gatewayId: number;
  totalItem: number;
  totalPrice: number;
  totalOfferPrice: number;
  totalVat: number;
  totalSaving: number;
  totalPaid: number;
  totalDue: number;
  noteTitle: string;
  noteDescription: string;
  status: string;
};

export type TTransaction = {
  transactionId: 0;
  type: "string";
  debitAccountId: 0;
  creditAccountId: 0;
  transactionCurrency: "string";
  transactionAmount: 0;
  usdRate: 0;
  note: "string";
  status: "string";
  creator: 0;
};

export type TInvoiceActivity = {
  id: number;
  activityKey: string;
  title: string;
  description: string;
  timeCreated: number;
  user: {
    id: number;
    displayName: string;
    email: string;
    phone: string;
    photoUrl: string;
    status: string;
    userProfile: null;
    primaryIds: number[];
    primaryProjectId: number;
  };
};

export type TInvoiceInfoResponse = {
  invoice: TInvoice;
  addressBilling: TBillingAddress;
  addressShipping: TShippingAddress;
  activity: TInvoiceActivity[];
  items: [];
  transactions: [];
  linkDownload: string;
  linkPrint: string;
  notFound?: boolean;
};

export type TPayment = {
  amount: number;
  payForce?: boolean;
  note?: string;
  payBy?: string;
};
