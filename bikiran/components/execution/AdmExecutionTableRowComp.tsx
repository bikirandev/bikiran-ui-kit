import React, { useState } from "react";
import { GetDate } from "@/bik-lib/utils/date";
import { useAdmExecution } from "./context/AdmExecutionProvider";
import { TExecutionData } from "./admExecutionType";
import { ApiExecuteData } from "./AdmExecutionOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import StatusColor from "@/bik-lib/utils/statusColor";
import { Button } from "bik-button";

type IProps = {
  data: TExecutionData;
};

const AdmExecutionTableRowComp = ({ data }: IProps) => {
  const { reFetch } = useAdmExecution();
  const { authInfo } = useAuth2();

  const [disable, setDisable] = useState<number[]>([]);

  const executeHandler = (id: number) => {
    // Disable the button
    setDisable((prev) => [...prev, id]);
    ApiExecuteData(authInfo, data.referenceKey, id)
      .then(({ message }) => {
        console.log(message);
      })
      .catch((err) => {
        setDisable((prev) => prev.filter((disabledId) => disabledId !== id));
      })
      .finally(() => {
        reFetch();
      });
  };

  const isButtonDisabled = (id: number) => disable.includes(id);
  return (
    <tr key={data.id} className="even:bg-primary-50 !border-0 text-left">
      <td className=" text-center">{data.id}</td>
      <td className="text-center">{data.referenceId}</td>
      <td className="text-center">{data.referenceKey}</td>
      <td className="text-left">{data.domain || "--"}</td>
      <td className="text-center">{data.timeSuccess}</td>
      <td className="text-center">{GetDate(data.timeCreated)}</td>
      <td className="text-center">
        <StatusColor status={data?.status || "---"} />
      </td>
      <td>
        <div className="w-full flex justify-center">
          <Button
            variant="secondary"
            title="Execute"
            className="text-sm h-8 text-[13px]"
            onClick={() => executeHandler(data.id)}
            disabled={isButtonDisabled(data.id)}
          />
        </div>
      </td>
    </tr>
  );
};

export default AdmExecutionTableRowComp;
