import React from "react";
import Image from "next/image";
import Link from "next/link";
import iconProject from "@/public/assets/images/icons/icon-default-app.svg";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { TTicketData } from "../../SupportTypes";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import { TooltipUserInfo } from "bik-utils";
import StatusColor from "@/bik-lib/utils/statusColor";
import { Button } from "bik-button";

type IProps = {
  data: TTicketData;
};
const SupportAdminTableBodyComp = ({ data }: IProps) => {
  return (
    <tr>
      <td className="font-normal text-center">{data.id}</td>
      <td className="">
        <div className="flex justify-center items-center">
          <TooltipUserInfo user={data?.user} ImageComponent={Image} />
        </div>
      </td>
      <td className="  text-primary  font-medium text-start">{data.subject}</td>
      <td className=" ">
        <div className="flex justify-center">
          <Image
            src={data.project || iconProject}
            alt="icons"
            width={0}
            height={0}
            className="size-8"
          />
        </div>
      </td>
      <td className=" text-primary-700 text-center  font-medium ">
        {data.department}
      </td>
      <td className=" text-primary-700 text-center  font-medium ">
        <TooltipWrapper content={GetTime(data.timeCreated) || ""}>
          {data.timeCreated ? GetDate(data.timeCreated) : ""}
        </TooltipWrapper>
        <br />
      </td>
      <td className="text-center">
        <StatusColor status={data?.status || "---"} />
      </td>
      <td className="px-[10px] py-[5px] ">
        <div className="flex justify-end ">
          <Button variant="secondary-line" className="!text-sm]">
            <Link href={`/support/ticket/${data.id}/info`}>View</Link>
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default SupportAdminTableBodyComp;
