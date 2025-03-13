export const apiAddInvoiceUrl = (key: string, id: string): string => {
  switch (key) {
    case "domain":
      return `/admin/invoice/${id}/domain/add-domain`;
    case "hosting":
      return `/admin/invoice/${id}/hosting/add-hosting`;
    case "any":
      return "/admin";
    default:
      throw new Error(`No API URL found for key: ${key}`);
  }
};

export const apiUpdateInvoiceUrl = (
  key: string,
  invoiceId: number,
  itemId: number
) => {
  switch (key) {
    case "domain":
      return `/admin/invoice/${invoiceId}/domain/${itemId}/update-domain`;
    case "hosting":
      return `/admin/invoice/${invoiceId}/hosting/${itemId}/update-hosting`;
    case "any":
      return "/admin";
    default:
      throw new Error(`No API URL found for key: ${key}`);
  }
};
