import { FC } from "react";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useCPanel } from "./context/CPanelProvider";
import HostingCPanalSkeletonComp from "./HostingCPanalSkeletonComp";
import { TooltipUserInfo, UserInfoComp } from "bik-utils";
import Image from "next/image";
import { TCPanel, TFilter } from "./CPanalType";
import StatusColor from "@/bik-lib/utils/statusColor";
import { icons } from "@/bikiran/lib/icons";

const TableRow: FC<{ data: any }> = ({ data }) => {
  const { openModal } = useTemplate();

  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td>
        <div className="flex items-center">
          <TooltipUserInfo user={data?.user} ImageComponent={Image} />
        </div>
      </td>
      <td className="text-left">
        <div className="flex flex-col ">
          <span className="font-normal text-primary-500 text-sm">
            {data?.cPanel?.cpDomain}
          </span>
          <span className="font-normal text-primary-500">
            {data?.cPanel?.cpEmail}
          </span>
        </div>
      </td>
      <td className="text-center "> {data?.cPanel?.cpHostname}</td>
      <td className="text-center">{data?.cPanel?.cpUsername}</td>
      <td className="text-center">{data?.cPanel?.cpPackage}</td>
      <td className="text-center">{data.subType}</td>
      <td className="text-center">
        <StatusColor status={data?.status || "---"} />
      </td>
      <td>
        <div className="flex justify-end">
          <InstOption disabled>
            <button
              type="button"
              onClick={() => openModal("update-status", data)}
            >
              Update Status
            </button>
          </InstOption>
        </div>
      </td>
    </tr>
  );
};

const CPanelListTable: FC<{
  data: {
    hostings: TCPanel[];
    filters: TFilter;
  };
}> = ({ data }) => {
  const { loading } = useCPanel();

  const placeholderArr = Array.from(
    { length: data?.hostings.length || 3 },
    (_, i) => i
  );
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>
          <th className="text-center w-[60px]">User </th>
          <th className="text-left w-[200px]">cPanel</th>
          <th className="text-center">cP Hostname</th>
          <th className="text-center w-[170px]">cP Username</th>
          <th className="text-center w-[170px]">cP Package</th>
          <th className="text-center w-[70px]">SubType</th>
          <th className="text-center w-[60px]">Status</th>
          <th className="!w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholderArr.map((i) => <HostingCPanalSkeletonComp key={i} />)
          : data?.hostings?.map((item: any) => (
              <TableRow key={item.id} data={item} />
            ))}

        {!loading && data?.hostings?.length === 0 && (
          <tr className="not-found">
            <td colSpan={6} className="text-center">
              No data found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default CPanelListTable;
