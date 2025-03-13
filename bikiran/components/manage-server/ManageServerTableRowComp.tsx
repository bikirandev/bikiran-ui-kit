import React from "react";
import { showInt } from "@/bik-lib/utils/show";
import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import { TServerData } from "./ManageServerType";
import { GetDate, GetTime } from "@/bik-lib/utils/date";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import StatusColor from "@/bik-lib/utils/statusColor";

type IProps = {
  data: TServerData;
};

const ManageServerTableRowComp = ({ data }: IProps) => {
  const { openModal } = useTemplate();

  return (
    <tr>
      <td className="text-center">{data.id}</td>
      <td>
        <span className="text-base font-medium">{data.title}</span>
        <span> ( {capitalizeFirstLetter(data.type)})</span>
        <br />
        <span className="text-sm">{data.os}</span>
      </td>
      <td className="text-start">
        <span className="font-medium">{data.hostname || "--"}</span>
        <br />
        <span>{data.primaryIp}</span>
      </td>
      <td>
        <span> {data.cpu}</span>
        <br />
        <span>{data.ram}</span>
      </td>
      <td>
        <span> {data.storage}</span>
      </td>
      <td className="text-center">
        <span>{data.environment}</span>
      </td>
      <td className="text-center">
        <StatusColor status={data?.status || "---"} />
      </td>
      <td>
        <InstOption>
          {/* <button type="button" onClick={() => { }}>
            Details
          </button> */}
          <button
            type="button"
            onClick={() => {
              openModal("update-server", data);
            }}
          >
            Update Server Info
          </button>
          <button
            type="button"
            onClick={() => {
              openModal("update-environment", data);
            }}
          >
            Update Environment
          </button>
          <button
            type="button"
            onClick={() => {
              openModal("update-status", data);
            }}
          >
            Update Status
          </button>
        </InstOption>
      </td>
    </tr>
  );
};

export default ManageServerTableRowComp;
