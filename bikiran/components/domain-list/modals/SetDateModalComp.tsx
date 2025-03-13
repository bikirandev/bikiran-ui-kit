import { InputDate } from "@/bik-lib/lib/InputFields";
import React from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { TAddDomainPayload } from "../domainListTypes";
import { DateInputField } from "bik-inputs";

const SetDateModalComp = ({
  formData,
  handleOnChange,
}: {
  formData: TAddDomainPayload;
  handleOnChange: (ev: TInputChangeEvent) => void;
}) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-base text-primary font-medium">
          Subscription Start
        </label>
        <DateInputField
          formData={formData}
          name="subscriptionStart"
          onChange={handleOnChange}
          className="w-full [&>div]:w-full z-50"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-base text-primary font-medium">
          Subscription End
        </label>
        <DateInputField
          formData={formData}
          name="subscriptionEnd"
          onChange={handleOnChange}
          className="w-full [&>div]:w-full z-50"
        />
      </div>
    </div>
  );
};

export default SetDateModalComp;
