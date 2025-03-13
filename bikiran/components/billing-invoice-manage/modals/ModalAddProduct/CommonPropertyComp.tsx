import { SelectField } from "@/bik-lib/lib/InputFields";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedInputField, DateInputField } from "bik-inputs";
import React, { FC } from "react";
import { durationOptions } from "./productConstants";
import { addOption } from "@/bik-lib/utils/option";
import PriceCalculationComp from "@/bikiran/shared/price-calculation-comp/PriceCalculationComp";
import { convertToYears } from "@/bik-lib/utils/convertToYears";

type TProps = {
  formData: Record<string, any>;
  handleOnChange: (e: TInputChangeEvent) => void;
  modalData?: any;
};

const CommonPropertyComp: FC<TProps> = ({
  formData,
  handleOnChange,
  modalData,
}) => {
  return (
    <div className="space-y-3">
      <AnimatedInputField
        label="Title"
        name="title"
        formData={formData}
        onChange={handleOnChange}
      />
      <div className="grid grid-cols-2 gap-2">
        <DateInputField
          formData={formData}
          name="subscriptionStart"
          onChange={handleOnChange}
          className="mt-[3px] !w-full [&_.react-datepicker-popper]:z-50"
        />

        <SelectField
          formData={formData}
          label=""
          placeholder="Duration"
          name="quantity"
          onChange={handleOnChange}
          options={durationOptions.map((item) =>
            addOption(item.id, item.title, item.value)
          )}
        />
      </div>
      <PriceCalculationComp
        formData={formData}
        handleOnChange={handleOnChange}
        unit={
          modalData
            ? convertToYears(
                modalData?.quantity,
                modalData?.unitName.toString()
              )
            : "y"
        }
        price={true}
        offer={true}
        vat={true}
      />
    </div>
  );
};

export default CommonPropertyComp;
