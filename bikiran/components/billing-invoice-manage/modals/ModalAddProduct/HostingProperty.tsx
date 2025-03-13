import { TInputChangeEvent } from "@/bik-lib/types/event";
import {
  AnimatedInputField,
  AnimatedTextArea,
  CalculationInputField,
  ValidationInputField,
} from "bik-inputs";
import React, { FC } from "react";

type TProps = {
  formData: any;
  handleOnChange: (e: TInputChangeEvent) => void;
};

export const HostingProperty: FC<TProps> = ({ formData, handleOnChange }) => {
  return (
    <div className="space-y-4">
      <ValidationInputField
        label="Domain"
        name="domain"
        formData={formData}
        onChange={handleOnChange}
      />
      <div className="flex justify-between items-center gap-2">
        <CalculationInputField
          label="Disk"
          name="disk"
          formData={formData}
          onChange={handleOnChange}
          calculate
        />
        <CalculationInputField
          label="Bandwidth"
          name="bandwidth"
          formData={formData}
          onChange={handleOnChange}
          calculate
        />
        <CalculationInputField
          label="CPU"
          name="cpu"
          formData={formData}
          onChange={handleOnChange}
          calculate
        />
      </div>
      <div className="flex justify-between items-center gap-2">
        <CalculationInputField
          label="RAM"
          name="ram"
          formData={formData}
          onChange={handleOnChange}
          calculate
        />
        <AnimatedInputField
          label="EP"
          name="ep"
          formData={formData}
          onChange={handleOnChange}
        />
        <AnimatedInputField
          label="IO"
          name="io"
          formData={formData}
          onChange={handleOnChange}
        />
      </div>
      <AnimatedTextArea
        label="Note"
        name="note"
        formData={formData}
        onChange={handleOnChange}
        className="h-28"
      />
    </div>
  );
};
