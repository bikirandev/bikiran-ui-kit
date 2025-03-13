import {
  TInvoiceData,
  TInvoiceInfo,
  TInvoiceProduct,
} from "@/bik-lib/types/invoice";
import { FC } from "react";
import DomainRow from "./DomainRow";
import HostingRow from "./HostingRow";
import { assetKeys } from "@/bik-lib/lib/assets";

const InvoiceTableBody: FC<{
  data: TInvoiceData;
  editable: boolean;
  reload?: () => void;
}> = ({ data, editable, reload }) => {
  const invoice: TInvoiceInfo = data?.invoice;
  const products: TInvoiceProduct[] = data.items || [];

  return (
    <tbody>
      {products.map((item: TInvoiceProduct, index: number) => {
        if (item?.assetKey === assetKeys.hosting) {
          return (
            <HostingRow
              key={item.id}
              index={index}
              data={item}
              editable={editable}
              invoice={invoice}
              reload={reload}
            />
          );
        }
        return (
          <DomainRow
            key={item.id}
            index={index}
            data={item}
            editable={editable}
            invoice={invoice}
            reload={reload}
          />
        );
      })}
      {/* Total Row */}
      <tr className="font-medium">
        <td colSpan={4} className="border border-black px-2 py-3 text-right">
          <span className="text-primary font-medium">Total:</span>
        </td>
        <td colSpan={1} className="border border-black px-2 py-3 text-center">
          <span className="text-primary font-medium">
            {invoice?.totalPrice.toFixed(2)}
          </span>
        </td>
      </tr>
    </tbody>
  );
};

export default InvoiceTableBody;
