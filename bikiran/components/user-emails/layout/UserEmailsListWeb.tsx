import { FC } from "react";
import { icons } from "@/bikiran/lib/icons";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TUserEmailsItem } from "../userEmailsType";
import { useUserEmailsList } from "../context/UserEmailsListProvider";
import Image from "next/image";
import UserListSkeletonComp from "../UserEmailsSkeletonComp";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { cn } from "@/bik-lib/utils/cn";
import { UserInfoComp } from "bik-utils";
import StatusColor from "@/bik-lib/utils/statusColor";

type TProps = {
  data: {
    contacts: TUserEmailsItem[];
    status: any[];
  };
};

const TableRow: FC<{ data: TUserEmailsItem }> = ({ data }) => {
  const { openModal } = useTemplate();

  const isInactive: boolean =
    data.status !== "active" || data?.user?.status !== "active";

  return (
    <tr>
      <td className="text-center">{data?.id}</td>
      <td className="text-start">
        <UserInfoComp
          photoUrl={data?.user?.photoUrl.trimEnd()}
          name={data?.user?.displayName}
          email={data?.user?.email}
          ImageComponent={Image}
        />
      </td>
      <td className="text-left overflow-ellipsis">{data?.identity}</td>
      <td className="text-start">{capitalizeFirstLetter(data?.provider)}</td>
      <td className="text-center">
        {capitalizeFirstLetter(data?.identityType)}
      </td>
      <td>
        {data?.isPrimary && (
          <div className="size-5 mx-auto ">
            <Image
              src={icons.iconTickV2}
              alt="avatar"
              width={25}
              height={25}
              className="w-full h-auto rounded-full"
            />
          </div>
        )}
      </td>
      <td className="text-center">
        <StatusColor status={isInactive ? "suspended" : "Active"} />
      </td>
      <td>
        {data?.user?.status === "active" ? (
          <InstOption>
            <button
              type="button"
              onClick={() => openModal("status-Update", data)}
            >
              Update Status
            </button>
          </InstOption>
        ) : (
          <InstOption disabled></InstOption>
        )}
      </td>
    </tr>
  );
};

const UserEmailsListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useUserEmailsList();
  const arr = Array.from({ length: data.contacts.length || 3 }, (_, i) => i);
  return (
    <table
      cellPadding={0}
      cellSpacing={0}
      className="table-container table-fixed"
    >
      <thead>
        <tr>
          <th className="!text-center w-[100px]">ID</th>
          <th className="text-start w-72">User/Name </th>
          <th className="text-left w-[250px]">Email</th>
          <th className="text-start w-[150px]">Provider</th>
          <th className="text-center w-[150px]">Contacts Types</th>
          <th className="text-center w-[80px]">Primary</th>
          <th className="text-center w-[100px]">Status</th>
          <th className="!text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? arr.map((i) => <UserListSkeletonComp key={i} />)
          : data?.contacts.map((item) => (
              <TableRow key={item.id} data={item} />
            ))}

        {!loading && data && data.contacts.length === 0 && (
          <tr className="not-found">
            <td colSpan={7} rowSpan={3}>
              No Emails Found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserEmailsListWeb;
