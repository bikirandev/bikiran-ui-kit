import { FC } from "react";
import { usePathname } from "next/navigation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { CustomSidebar } from "bik-utils";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { showCurrencySign } from "@/bik-lib/utils/show";
import { TInvoiceTransaction } from "@/bik-lib/types/invoice";

const Header: FC<{
  data: TInvoiceTransaction[];
}> = ({ data }) => {
  const { openModal } = useTemplate();
  return (
    <div className="flex items-center justify-between w-full mb-4">
      <div className="flex items-center gap-2">
        <span className="text-primary text-xl font-medium">Transactions</span>
        <div className="text-xs text-secondary font-medium bg-secondary-100 size-6 rounded-full flex justify-center items-center">
          {data?.length || 0}
        </div>
      </div>
      <button
        type="button"
        onClick={() => openModal("custom-sidebar", data)}
        className="text-primary-500 text-sm font-medium hover:border-b hover:text-primary"
      >
        View All
      </button>
    </div>
  );
};

const TransactionItem: FC<{
  data: TInvoiceTransaction;
}> = ({ data }) => {
  return (
    <div className="border-b last:border-none border-primary-200 pb-2 last:pb-0 mb-2 last:mb-0 flex justify-between items-center">
      <div>
        <p className="text-primary-500 text-xs">Trx : {data?.transactionId}</p>
        <p className="text-primary text-sm">Note : {data?.note}</p>
      </div>

      <div className="text-sm font-medium">
        {showCurrencySign(data?.transactionCurrency)}
        {data?.transactionAmount}
      </div>
    </div>
  );
};

const InvoiceTransactionComp: FC = () => {
  const { transactions } = useInvoiceInfo();

  return (
    <div className="invoice-action-cont overflow-hidden">
      <Header data={transactions} />
      {transactions
        ?.slice(0, 4) // Show only 4 transactions
        ?.map((item: TInvoiceTransaction) => (
          <TransactionItem key={item?.transactionId} data={item} />
        ))}

      <CustomSidebar
        usePathname={usePathname}
        useTemplate={useTemplate}
        // className="max-w-[400px]"
      >
        {transactions?.map((item: TInvoiceTransaction) => (
          <TransactionItem key={item?.transactionId} data={item} />
        ))}
      </CustomSidebar>
    </div>
  );
};

export default InvoiceTransactionComp;
