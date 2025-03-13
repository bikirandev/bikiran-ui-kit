import { FC } from "react";
import { useUserProjectsList } from "../context/UserProjectsListProvider";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TUserProjectsItem } from "../userProjectsType";
import UserProjectsSkeletonComp from "../UserProjectsSkeletonComp";
import { UserInfoComp } from "bik-utils";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import StatusColor from "@/bik-lib/utils/statusColor";

type TProps = {
  data: {
    projects: TUserProjectsItem[];
  };
};

const TableRow: FC<{ data: TUserProjectsItem }> = ({ data }) => {
  const { openModal } = useTemplate();

  const isInactive: boolean = data.status !== "active";

  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td className="text-start">
        <UserInfoComp
          photoUrl={data?.user?.photoUrl.trimEnd() || icons.iconUser}
          name={data?.user?.displayName || "----"}
          email={data?.user?.email || "----"}
          ImageComponent={Image}
        />
      </td>
      <td>
        <div className="flex flex-col gap-1">
          <span className="text-primary font-medium">{data.title}</span>
          <span className="text-primary-500">{data.domain}</span>
        </div>
      </td>
      <td className="text-left overflow-ellipsis items-center">{data.phone}</td>
      <td className="text-center">
        <StatusColor status={isInactive ? "Inactive" : "Active"} />
      </td>
      <td>
        <div className="flex justify-end items-center">
          <InstOption disabled>
            <button
              type="button"
              onClick={() => openModal("status-Update", data)}
            >
              Update Status
            </button>
          </InstOption>
        </div>
      </td>
    </tr>
  );
};

const UserProjectsListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useUserProjectsList();
  const arr = Array.from({ length: data?.projects.length || 3 }, (_, i) => i);

  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      className="table-container table-fixed"
    >
      <thead>
        <tr>
          <th className="w-[100px] !text-center">ID</th>
          <th className="text-start w-[300px]">User/Name </th>
          <th className="text-left w-[250px]">Project</th>
          <th className="text-left w-[250px]">Contact</th>
          <th className="text-center w-20">Status</th>
          <th className="w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? arr.map((i) => <UserProjectsSkeletonComp key={i} />)
          : data?.projects.map((item) => (
              <TableRow key={item.id} data={item} />
            ))}

        {!loading && data && data.projects.length === 0 && (
          <tr className="not-found">
            <td className="text-center " colSpan={7} rowSpan={3}>
              No User List yet!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserProjectsListWeb;
