import { TInvoiceData, TInvoiceInfo } from "@/bik-lib/types/invoice";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { GetDate } from "@/bik-lib/utils/date";
import { FC } from "react";

const InvoiceInfoRow: FC<{
  title: string;
  value: string;
}> = ({ title, value }) => {
  return (
    <div className="flex items-center justify-between mb-1">
      <div className="text-primary-700 font-normal">{title}:</div>
      <div className="text-primary font-medium">{value}</div>
    </div>
  );
};

const InvoiceInfo: FC<{ data: TInvoiceData }> = ({ data }) => {
  const invoice: TInvoiceInfo = data?.invoice as TInvoiceInfo;
  return (
    <div className="text-sm w-full mt-2">
      <h2 className="text-primary text-base md:text-lg font-medium text-left mb-2">
        Invoice Info
      </h2>
      <InvoiceInfoRow title="Invoice Number" value={`#${invoice?.id || 0}`} />
      <InvoiceInfoRow
        title="Date of Issue"
        value={GetDate(invoice?.timeIssue) || ""}
      />
      <InvoiceInfoRow
        title="Payment Due Date"
        value={GetDate(invoice?.timeDue) || ""}
      />
      <InvoiceInfoRow title="Currency" value={invoice?.localCurrency || ""} />
      <InvoiceInfoRow
        title="Status"
        value={capitalizeFirstLetter(invoice?.status.toLocaleLowerCase()) || ""}
      />
    </div>
  );
};

export default InvoiceInfo;
