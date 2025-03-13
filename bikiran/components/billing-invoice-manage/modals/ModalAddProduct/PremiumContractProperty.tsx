import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedInputField, AnimatedTextArea } from "bik-inputs";
import React, { FC } from "react";

type TProps = {
  formData: any;
  handleOnChange: (e: TInputChangeEvent) => void;
};

export const PremiumContractProperty: FC<TProps> = ({
  formData,
  handleOnChange,
}) => {
  return (
    <div className="space-y-4">
      {/* TODO : Add ckEditors */}
      <AnimatedInputField
        label="Validity"
        name="validity"
        formData={formData}
        onChange={handleOnChange}
      />
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
