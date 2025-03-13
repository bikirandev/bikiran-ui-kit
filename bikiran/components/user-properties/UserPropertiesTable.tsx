"use client";
import { FC } from "react";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { UserInfoComp } from "bik-utils";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import StatusColor from "@/bik-lib/utils/statusColor";
import { useUserProp } from "./context/UserPropertiesProvider";
import UserPropertiesSkeleton from "./UserPropertiesSkeleton";
import { TUserProp } from "./UserPropType";
import { Switch } from "../ui/switch";
import { useApi } from "@/bik-lib/context/api/ApiProvider";
const TableRow: FC<{ data: TUserProp; reload: () => void }> = ({
  data,
  reload,
}) => {
  const { openModal, setConfirm, setTemplateLoading, setMessage } =
    useTemplate();
  const { put } = useApi();

  const isInactive: boolean = data.status !== "active";

  const toggle2FAStatus = (userId: number, st: boolean) => {
    setConfirm({
      show: true,
      text: `Are you sure you want to ${st ? "enable" : "disable"} 2FA?`,
      textCancel: "Cancel",
      textAction: st ? "Enable" : "Disable",
      textActionCname: st ? "bg-success" : "bg-error",
      textCancelCname: "bg-primary-200",
      clickAction: () => {
        setTemplateLoading(true);
        put(`/user/prop/${userId}/change-tfa-status`, {
          isEnable: st ? true : false,
        })
          .then(({ message }) => {
            setMessage(message);
            setConfirm(null);
            reload();
          })
          .catch((err: Error) => {
            setMessage(err.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };
  const toggleBillingStatus = (userId: number, st: boolean) => {
    setConfirm({
      show: true,
      text: `Are you sure you want to ${st ? "active" : "deactive"} billing?`,
      textCancel: "Cancel",
      textAction: st ? "Active" : "Deactive",
      textActionCname: st ? "bg-success" : "bg-error",
      textCancelCname: "bg-primary-200",
      clickAction: () => {
        setTemplateLoading(true);
        put(`/user/prop/${userId}/change-billing-status`, {
          isEnable: st ? true : false,
        })
          .then(({ message }) => {
            setMessage(message);
            setConfirm(null);
            reload();
          })
          .catch((err: Error) => {
            setMessage(err.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  return (
    <tr>
      <td className=" text-center">{data?.id}</td>
      <td className="text-start">
        <UserInfoComp
          photoUrl={data?.photoUrl.trimEnd() || icons.iconUser}
          name={data?.name || "----"}
          email={data?.email || "----"}
          ImageComponent={Image}
        />
      </td>
      <td>
        <div className="flex justify-center">
          <Switch
            checked={data.tfaEnabled}
            disabled={isInactive}
            onClick={() =>
              toggle2FAStatus(data?.id, !(data.tfaEnabled === true))
            }
          />
        </div>
      </td>
      <td>
        <div className="flex justify-center">
          <Switch
            checked={data.billingEnabled}
            disabled={isInactive}
            onClick={() =>
              toggleBillingStatus(data?.id, !(data.billingEnabled === true))
            }
          />
        </div>
      </td>
      <td></td>
      <td className="text-center">
        <StatusColor status={isInactive ? "Inactive" : "Active"} />
      </td>
      <td>
        <InstOption disabled>
          <button
            type="button"
            onClick={() => openModal("status-userProp-Update", data)}
          >
            Update Status
          </button>
        </InstOption>
      </td>
    </tr>
  );
};

const UserPropertiesTable: FC = () => {
  const { loading, userProperties, reload } = useUserProp();
  const arr = Array.from({ length: userProperties?.length || 3 }, (_, i) => i);

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
          <th className="w-[80px]">2FA</th>
          <th className="w-[80px]">Billing</th>
          <th className="text-left">Properties</th>
          <th className="text-center w-20">Status</th>
          <th className=" !text-center w-[50px]">#</th>
        </tr>
      </thead>
      <tbody>
        {loading
          ? arr.map((i) => <UserPropertiesSkeleton key={i} />)
          : userProperties?.map((item: any) => (
              <TableRow key={item.id} data={item} reload={reload} />
            ))}

        {!loading && userProperties && userProperties.length === 0 && (
          <tr>
            <td className="text-center top-20 relative" colSpan={7} rowSpan={3}>
              No User Properties Found!
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default UserPropertiesTable;
