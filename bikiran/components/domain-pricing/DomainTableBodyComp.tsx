import React from "react";
import { showInt } from "@/bik-lib/utils/show";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { TDomainPrice } from "./DomainTypes";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import StatusColor from "@/bik-lib/utils/statusColor";

interface IProps {
  data: TDomainPrice[];
}

const DomainTableBodyComp = ({ data }: IProps) => {
  const { openModal } = useTemplate();

  return data.map((item, index) => (
    <tr key={index}>
      <td className="font-medium !w-[100px] !text-center">{item.id}</td>
      <td>
        <p className="text-primary-500 text-left font-normal">{item.tld}</p>
      </td>
      <td>
        <div className="text-primary  font-medium text-center">
          {item.price === item.promotionPrice ? (
            <span>$ {showInt(item.price)}</span>
          ) : (
            <div className="flex flex-col items-center">
              <span className="">$ {showInt(item.promotionPrice)}</span>
              <span className="line-through text-primary-500 text-[11px] leading-4">
                $ {showInt(item.price)}
              </span>
            </div>
          )}
        </div>
      </td>
      <td>
        <p className="text-primary  text-center font-normal">
          ${showInt(item.restorePrice)}
        </p>
      </td>
      <td>
        <p className="text-primary  text-center font-normal">
          ${showInt(item.transferPrice)}
        </p>
      </td>
      <td>
        <p className="text-primary  text-center font-normal">
          ${showInt(item.redemptionPrice)}
        </p>
      </td>
      <td>
        <p className="text-primary-500  font-normal text-center">
          {item.minDuration} Year
        </p>
      </td>
      <td className="text-center">
        <StatusColor status={item?.status} />
      </td>
      <td>
        <InstOption>
          <button
            type="button"
            onClick={() => openModal("update-domain-package", item)}
          >
            Update Package
          </button>
          <button
            type="button"
            onClick={() => openModal("update-domain-status", item)}
          >
            Update Status
          </button>
        </InstOption>
      </td>
    </tr>
  ));
};

export default DomainTableBodyComp;
