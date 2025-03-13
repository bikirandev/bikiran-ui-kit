"use client";
import { FC, useState } from "react";
import { useInvoiceList } from "./context/InvoiceListProvider";
import { TInvoiceTableItem } from "./InvoiceListTypes";
import InvoiceTableRowComp from "./InvoiceTableRowComp";
import InvoiceTableRowSkeletonComp from "./InvoiceTableRowSkeletonComp";
import { Checkbox } from "../ui/checkbox";
import InvoiceCustomSummaryComp from "./InvoiceCustomSummaryComp";

const InvoiceTableSection: FC<{ invoices: any }> = ({ invoices }) => {
  const { loading } = useInvoiceList();
  const [selectedData, setSelectedData] = useState<TInvoiceTableItem[]>([]);

  const selectAll = () => {
    if (selectedData?.length === invoices?.length) {
      setSelectedData([]);
    } else {
      setSelectedData(invoices);
    }
  };

  const selectOne = (data: TInvoiceTableItem) => {
    if (selectedData?.findIndex((item) => item.id === data.id) === -1) {
      setSelectedData((prev: TInvoiceTableItem[] | []) => [...prev, data]);
    } else {
      setSelectedData(selectedData?.filter((item) => item.id !== data.id));
    }
  };

  const isAllSelected = selectedData?.length === invoices?.length;

  return (
    <div className="flex flex-col gap-3">
      <table className="table-container">
        <thead>
          <tr>
            <th className="w-[130px]">
              <div
                className="flex items-center gap-2"
                onClick={() => selectAll()}
              >
                <Checkbox
                  className={`border-primary ring-0 data-[state=checked]:border-secondary  data-[state=checked]:bg-secondary data-[state=checked]:text-white`}
                  checked={!loading ? isAllSelected : false}
                />
                Invoice ID
              </div>
            </th>
            <th className="w-14 text-center">User</th>
            <th className="text-left">Invoice Title</th>
            <th className="w-[130px] text-center">Issue Date</th>
            <th className="w-[130px] text-center">Due Date</th>
            <th className="w-[150px] ">Bill Amount</th>
            <th className="w-[150px] ">Paid Amount</th>
            <th className="w-[120px] text-center">Status</th>
            <th className="w-[80px]  text-right">#</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            Array.from({ length: invoices?.length || 2 })
              .map((_, i) => i)
              .map((i) => <InvoiceTableRowSkeletonComp key={i} />)
          ) : (
            <InvoiceTableRowComp
              data={invoices}
              selectOne={selectOne}
              selectedData={selectedData}
              isAllSelected={isAllSelected}
            />
          )}

          {!loading && invoices?.length === 0 && (
            <tr className="hover:!bg-transparent">
              <td colSpan={8} className="text-center font-medium !text-xl h-40">
                No Invoice Found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <InvoiceCustomSummaryComp data={selectedData} />
      {/* <Pagination totalData={Array.isArray(domainPriceData) ? domainPriceData.length : 0} dataPerPage={dataPerPage} setCurrentPage={setCurrentPage} /> */}
    </div>
  );
};

export default InvoiceTableSection;
