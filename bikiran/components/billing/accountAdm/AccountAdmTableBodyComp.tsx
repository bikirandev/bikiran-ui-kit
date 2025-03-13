import React from "react";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { TAccountAdmData } from "./AccountAdmTypes";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TooltipUserInfo } from "bik-utils";
import Image from "next/image";
import StatusColor from "@/bik-lib/utils/statusColor";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

type IProps = {
  data: TAccountAdmData[] | null | undefined;
};

const AccountAdmTableBodyComp = ({ data }: IProps) => {
  const { openModal } = useTemplate();
  const router = useRouter();
  return (
    <tbody>
      {Array.isArray(data) &&
        data.map((item, index) => (
          <tr key={index}>
            <td className="text-center">{item.id}</td>
            <td className="">
              <div className="flex justify-center items-center">
                {item?.user !== null ? (
                  <TooltipUserInfo user={item?.user} ImageComponent={Image} />
                ) : (
                  <span className="font-medium text-sm">System</span>
                )}
              </div>
            </td>
            <td>
              <div className="flex flex-col ">
                <span className="text-sm overflow-ellipsis text-nowrap overflow-hidden">
                  {item.title}
                </span>
                <span className=" text-primary-500 leading-3 ">
                  {item.type}
                </span>
              </div>
            </td>
            <td className="text-start">
              {showCurrencySign(item.currency)}
              {showInt(item.totalDebit) || "0.00"} -
              {showCurrencySign(item.currency)}
              {showInt(item.totalCredit) || "0.00"}
            </td>

            <td className="text-center">
              {showCurrencySign(item.currency)}
              {showInt(item.balance) || "0.00"}
            </td>
            <td className="text-center">{item.currency}</td>
            <td className="text-center">
              {item.timeUpdated
                ? `${GetDate(item.timeUpdated)}  ${GetTime(item.timeUpdated)}`
                : "--"}
            </td>
            <td className="text-center">
              <StatusColor status={item?.status || "---"} />
            </td>
            <td>
              <InstOption>
                <button
                  type="button"
                  onClick={() => openModal("credit-note", item)}
                  className=""
                >
                  Add Credit Note
                </button>
                <button
                  type="button"
                  onClick={() => openModal("debit-note", item)}
                  className=""
                >
                  Add Debit Note
                </button>
                <button
                  type="button"
                  onClick={() =>
                    router.push(
                      `/billing/account/${item.id}/statement?dateFrom=${dayjs().subtract(1, "year").format("YYYY-MM-DD")}&dateTo=${dayjs().format("YYYY-MM-DD")}`
                    )
                  }
                >
                  Statement
                </button>
              </InstOption>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default AccountAdmTableBodyComp;
