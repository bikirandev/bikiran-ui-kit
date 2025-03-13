import React from "react";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import TooltipWrapper from "@/bik-lib/lib/TooltipWrapper";
import StatusColor from "@/bik-lib/utils/statusColor";

type IProps = {
  data: any;
};
const GatewayTransactionTableBodyComp = ({ data }: IProps) => {
  return (
    <tbody>
      {Array.isArray(data) &&
        data.map((item, index) => (
          <tr key={index}>
            <td className="text-center">{item.id}</td>
            <td className="text-center">{item.invoiceId}</td>
            <td className="text-center">{item.projectId}</td>
            <td className="text-center">{item.gatewayId}</td>
            <td className=" text-center">
              {showCurrencySign(item.transactionCurrency)}
              {showInt(item.transactionAmount)}
            </td>
            <td className="text-center">
              <TooltipWrapper
                content={GetTime(item.timeCreated)?.toString() || " "}
              >
                {GetDate(item.timeCreated)}
              </TooltipWrapper>
            </td>

            <td className="text-center">
              <StatusColor status={item?.status || "---"} />
            </td>
            <td>
              <InstOption disabled>
                <button type="button" onClick={() => {}}>
                  Delete
                </button>
                <button type="button" onClick={() => {}}>
                  Details
                </button>
              </InstOption>
            </td>
          </tr>
        ))}
    </tbody>
  );
};

export default GatewayTransactionTableBodyComp;
