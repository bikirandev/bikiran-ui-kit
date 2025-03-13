import { FC } from "react";
import { TUserAddressItem } from "../userAddressType";

import UserListSkeletonComp from "../UserAddressSkeletonComp";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useUserAddressList } from "../context/UserAddressListProvider";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { UserInfoComp } from "bik-utils";
import StatusColor from "@/bik-lib/utils/statusColor";

type TProps = {
  data: TUserAddressItem[];
};

const TableRow: FC<{ data: TUserAddressItem }> = ({ data }) => {
  const { openModal } = useTemplate();

  const isInactive: boolean =
    data.status !== "active" || data?.user?.status !== "active";

  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td className="text-start">
        <UserInfoComp
          photoUrl={data?.user?.photoUrl.trimEnd() || icons.iconUser}
          name={data?.user?.displayName || "----"}
          email={data?.email || "----"}
          ImageComponent={Image}
        />
      </td>
      <td>{data?.mobile}</td>
      <td>
        <span className="max-w-[430px] w-full text-start text-wrap line-clamp-2 overflow-hidden text-ellipsis">
          {data?.line1 || "--"} {data?.line2}
          {data?.line3}
        </span>
      </td>
      <td className="text-start text-nowrap overflow-hidden overflow-ellipsis">
        {data?.zipCode}
      </td>
      <td>
        {data?.isPrimary && (
          <div className="size-5  mx-auto">
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
        <StatusColor status={isInactive ? "Inactive" : "Active"} />
      </td>
      <td>
        <InstOption>
          <button
            type="button"
            onClick={() => openModal("update-address", data)}
          >
            Update Address
          </button>
          <button
            type="button"
            onClick={() => openModal("update-status", data)}
          >
            Update Status
          </button>
        </InstOption>
      </td>
    </tr>
  );
};

const UserAddressListWeb: FC<TProps> = ({ data }) => {
  const { loading } = useUserAddressList();
  const arr = Array.from({ length: data?.length || 3 }, (_, i) => i);
  return (
    <table cellPadding={0} cellSpacing={0} className="table-container">
      <thead>
        <tr>
          <th className="!text-center w-[100px]">ID</th>
          <th className="text-start w-[300px]">User/Name </th>
          <th className="text-start w-[150px]">Phone</th>
          <th className="text-left ">Address</th>
          <th className="text-left w-[50px]">Zip</th>
          <th className="text-center w-[80px]">Primary</th>
          <th className="text-center w-24">Status</th>
          <th className="!text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? arr.map((i) => <UserListSkeletonComp key={i} />)
          : data?.map((item) => <TableRow key={item.id} data={item} />)}

        {!loading && data && data.length === 0 && (
          <tr>
            <td className="text-center top-20 relative" colSpan={7} rowSpan={3}>
              No address found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserAddressListWeb;
