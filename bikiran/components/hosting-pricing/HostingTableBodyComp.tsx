import { FC } from "react";
import { showInt } from "@/bik-lib/utils/show";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { THostingPkg } from "./HostingTypes";
import capitalizeSentence from "@/bik-lib/utils/capitalizeSentence";
import StatusColor from "@/bik-lib/utils/statusColor";

type IProps = {
  data: THostingPkg[];
};

const HostingTableBodyComp: FC<IProps> = ({ data }) => {
  const { openModal } = useTemplate();
  return data.map((item: THostingPkg, index: any) => (
    <tr key={index} className="even:bg-primary-50 !border-0 ">
      <td className="font-medium text-center">{item.id}</td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {capitalizeSentence(item.subType)}
        </p>
      </td>
      <td>
        <p className="text-primary text-sm font-normal text-center">
          {item.diskType}
        </p>
      </td>
      <td>
        <p className="text-primary text-sm font-normal text-center">
          {item.bandwidth}
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {item.cpu} core
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {item.ram / 1024} GB
        </p>
      </td>

      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          {item.location}
        </p>
      </td>
      <td>
        <div className="text-primary text-sm font-medium text-center">
          {item.price === item.pricePromotion ? (
            <span>$ {showInt(item.price)}</span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="">$ {showInt(item.pricePromotion)}</span>
              <span className="line-through text-primary-500 text-xs">
                $ {showInt(item.price)}
              </span>
            </div>
          )}
        </div>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          $ {showInt(item.priceSetup)}
        </p>
      </td>
      <td>
        <p className="text-primary-500 text-sm font-normal text-center">
          $ {showInt(item.priceRestore)}
        </p>
      </td>
      <td className="text-center">
        <StatusColor status={item?.status} />
      </td>
      <td className="text-right flex  justify-end rounded-tr-8 rounded-br-8 pr-3 pt-3">
        <InstOption>
          <button
            type="button"
            onClick={() => openModal("update-hosting-package", item)}
          >
            Update Package
          </button>
          <button
            type="button"
            onClick={() => openModal("status-change", item)}
          >
            Change Status
          </button>
        </InstOption>
      </td>
    </tr>
  ));
};

export default HostingTableBodyComp;
