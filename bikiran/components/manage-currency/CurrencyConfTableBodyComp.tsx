import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { TCurrencyConfData } from "./CurrencyConfTypes";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC } from "react";
import StatusColor from "@/bik-lib/utils/statusColor";

interface IProps {
  data: TCurrencyConfData;
}
const CurrencyConfTableBodyComp: FC<IProps> = ({ data }: IProps) => {
  const { openModal } = useTemplate();
  return (
    <tr>
      <td className="font-medium text-center">{data.id}</td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-left">
          {data.title}
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {data.currency}
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {data.rate}
        </p>
      </td>
      <td className="text-center">
        <StatusColor status={data?.status || "---"} />
      </td>
      <td>
        {data.currency !== "USD" ? (
          <InstOption>
            {/* <button type="button" onClick={() => {}}>
              Details
            </button> */}
            <button
              type="button"
              onClick={() => openModal("update-currency", data)}
            >
              Update Rate
            </button>
            <button
              type="button"
              onClick={() => openModal("status-Update", data)}
            >
              Update Status
            </button>
          </InstOption>
        ) : null}
      </td>
    </tr>
  );
};

export default CurrencyConfTableBodyComp;
