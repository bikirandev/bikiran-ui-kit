import { SelectField } from "@/bik-lib/lib/InputFields";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import React, { FC, useState } from "react";
import { usePaymentMethod } from "./context/PaymentMethodProvider";
import { addOption } from "@/bik-lib/utils/option";

const PaymentFilterFields: FC<{
  formData: { [key: string]: any };
  handleInputChange: (ev: TInputChangeEvent) => void;
}> = ({ formData, handleInputChange }) => {
  const { data } = usePaymentMethod();

  return (
    <div>
      <SelectField
        formData={formData}
        label={"Currency"}
        name="currency"
        onChange={handleInputChange}
        options={
          data.filters.currencyOptions.map((i) =>
            addOption(i.title, i.currency, i.currency)
          ) || []
        }
        className="filter-inputs"
      />
    </div>
  );
};

export default PaymentFilterFields;
