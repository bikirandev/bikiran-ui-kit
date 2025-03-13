import { FC } from "react";
import { useBankManagement } from "./context/BankManagementProvider";
import BankManagementSkeletonComp from "./BankManagementSkeletonComp";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { UserInfoComp } from "bik-utils";
import StatusColor from "@/bik-lib/utils/statusColor";
import { TBankAccount } from "./bankManagementTypes";

const TableRow: FC<{ data: TBankAccount }> = ({ data }) => {
  const { openModal } = useTemplate();

  const isInactive: boolean = data.status !== "active";

  const bankInfo = data?.bankInfo;

  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td className="text-left">{bankInfo.accountName}</td>
      <td className="text-center">{bankInfo.accountNumber}</td>
      <td className="text-left">{bankInfo.bankName}</td>
      <td className="text-center">{bankInfo.routingNumber}</td>
      <td className="text-center">{bankInfo.swift}</td>

      <td className="text-center">
        <StatusColor status={isInactive ? "Inactive" : "Active"} />
      </td>
      <td>
        <InstOption>
          <button
            type="button"
            onClick={() => openModal("update:bank-account", data)}
          >
            Update Info
          </button>
          <button
            type="button"
            onClick={() => openModal("update-bank-status", data)}
          >
            Update Status
          </button>
        </InstOption>
      </td>
    </tr>
  );
};

const BankManagementTable: FC = () => {
  const { loading, accounts } = useBankManagement();
  const arr = Array.from({ length: accounts?.length || 3 }, (_, i) => i);
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      className="table-container table-fixed"
    >
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>
          <th className="text-left">Account Name</th>
          <th className="text-center w-[200px]">Account Number</th>
          <th className="text-left">Bank Name</th>
          <th className="text-center w-[180px]">Routing Number</th>
          <th className="text-center w-[150px]">Swift</th>
          <th className="text-center w-[100px]">Status</th>
          <th className=" !text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? arr.map((i) => <BankManagementSkeletonComp key={i} />)
          : accounts?.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && accounts && accounts.length === 0 && (
          <tr className="not-found">
            <td colSpan={7} className="text-center">
              No Bank Management data yet!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default BankManagementTable;
