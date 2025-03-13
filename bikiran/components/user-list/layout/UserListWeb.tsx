import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { FC, useState } from "react";
import { TStatus, TUserListItem } from "../userListType";
import { useUserList } from "../context/UserListProvider";
import UserListSkeletonWeb from "./UserListSkeletonWeb";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TPagination } from "@/bik-lib/types/response";
import { UserInfoComp } from "bik-utils";
import Image from "next/image";
import StatusColor from "@/bik-lib/utils/statusColor";

type TProps = {
  data: {
    users: TUserListItem[];
    status: TStatus[];
    pagination: TPagination;
  };
};

const TableRow: FC<{ data: TUserListItem }> = ({ data }) => {
  const { modalData, openModal } = useTemplate();
  const [isActive, setIsActive] = useState(false);

  const handleRowClick = () => {
    setIsActive(!isActive); // Active state toggle
    openModal("custom-sidebar", data); // Modal open
  };

  return (
    <tr
      onClick={handleRowClick}
      className={`cursor-pointer ${
        modalData?.id === data.id ? "!bg-primary-200" : ""
      }`}
    >
      <td className="text-center">{data?.id}</td>
      <td className="text-left">
        <UserInfoComp
          photoUrl={data?.photoUrl.trimEnd()}
          name={data?.name}
          email={data?.email}
          ImageComponent={Image}
        />
      </td>
      <td>{data?.phone || "--"}</td>
      <td>{data?.organization || "--"}</td>
      <td>
        <div className="max-w-[275px] overflow-hidden">
          <div className="whitespace-nowrap overflow-hidden text-ellipsis">
            {data?.address || "--"}
          </div>
          <div>{data?.addressZip || "--"}</div>
        </div>
      </td>
      <td className="text-center">{data?.source || "--"}</td>
      <td className="text-center">
        <StatusColor status={data.status} />
      </td>
      <td>
        <div className="w-full flex justify-end">
          <InstOption className="size-7">
            {/* <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openModal("update-user", data);
              }}
            >
              Update
            </button> */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openModal("status-Update", data);
              }}
            >
              Update Status
            </button>
          </InstOption>
        </div>
      </td>
    </tr>
  );
};

const UserListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useUserList();
  const placeholder = Array.from(
    { length: data?.users?.length || 3 },
    (_, i) => i
  );

  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      className="table-container table-fixed"
    >
      <thead>
        <tr>
          <th className="!text-center w-[100px]">ID</th>
          <th className="text-left w-[260px]">User/Name</th>
          <th className="text-left w-[150px]">Phone</th>
          <th className="text-left w-[100px]">Organization</th>
          <th className="text-left w-[150px] ">Address</th>
          <th className="text-center w-[100px]">Source</th>
          <th className="text-center w-[100px]">Status</th>
          {/* <th className="text-center w-32">Created on</th> */}
          <th className="!text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? placeholder.map((i) => <UserListSkeletonWeb key={i} />)
          : data?.users.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data.users.length === 0 && (
          <tr className="not-found">
            <td colSpan={8} className="text-center">
              No user found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserListWeb;
