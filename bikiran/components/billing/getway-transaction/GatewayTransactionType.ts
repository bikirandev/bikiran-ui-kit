export type TGatewayTransactionType = {
    id: number;
    invoiceId: number;
    projectId: number;
    agreementId: string;
    method: string;
    gatewayId: number;
    gatewayKey: string;
    cardType: string;
    bank: string;
    transactionCurrency: string;
    transactionAmount: number;
    usdRate: number;
    trxId: string;
    accountNo: string;
    timeSuccess: number;
    timeFailed: number;
    note: string;
    status: string;
    timeCreated: number;
    timeUpdated: number;
    user: {
        id: number;
        displayName: string;
        email: string;
        phone: string;
        photoUrl: string;
    };
    project: any;
};