import React, { FC } from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import dayjs from "dayjs";
import { showInt } from "@/bik-lib/utils/show";
import { CalculationInputField } from "bik-inputs";

type TProps = {
  formData: any;
  handleOnChange: (ev: TInputChangeEvent) => void;
  unit?: string;
  price?: boolean;
  offer?: boolean;
  vat?: boolean;
};

const PriceCalculationComp: FC<TProps> = ({
  formData,
  handleOnChange,
  unit,
  price,
  offer,
  vat,
}) => {
  const calculateSubscriptionDuration = () => {
    const start = dayjs(formData?.subscriptionStart);
    const end = dayjs(formData?.subscriptionEnd);

    return end.diff(start, "month", false); // "true" for fractional months
  };

  const calculateTotalPrice = () => {
    const price = formData.contractPrice || 0; // Default to 0 if price is not provided
    const offer =
      (formData?.contractOfferPrice as number) > 0 &&
      (formData?.contractOfferPrice as number) <= price
        ? formData?.contractOfferPrice
        : price;
    const vat = formData?.contractVatPercent || 0; // Default to 0 if VAT is not provided
    const duration = calculateSubscriptionDuration(); // Duration in months

    // Convert months to years for the calculation
    const durationInYears = duration / 12;

    // Calculate base price for the duration
    const basePriceForDuration =
      (offer as number) * (durationInYears > 1 ? durationInYears : 1);

    // Add VAT if applicable
    const total =
      vat > 0
        ? basePriceForDuration + (basePriceForDuration * vat) / 100
        : basePriceForDuration;

    return showInt(total); // Assuming showInt formats the number
  };

  const calculateMoneySaved = () => {
    const price = formData?.contractPrice || 0;
    const offer = formData?.contractOfferPrice || 0;

    const savedAmount = price - offer;

    return showInt(savedAmount);
  };

  const isDisabled = formData?.contractCurrency === "";

  return (
    <div className="flex gap-2">
      {price && (
        <div>
          <CalculationInputField
            label="Price"
            name="contractPrice"
            formData={formData}
            onChange={handleOnChange}
            calculate
            unit={
              unit && formData?.contractPrice?.toString().length > 0 ? unit : ""
            }
            currency={formData.contractCurrency}
            disabled={isDisabled}
            autoComplete="off"
          />
        </div>
      )}
      {offer && (
        <div className="flex flex-col gap-1">
          <CalculationInputField
            label="Offer"
            name="contractOfferPrice"
            formData={formData}
            onChange={handleOnChange}
            calculate
            unit={
              unit && formData?.contractOfferPrice?.toString().length > 0
                ? unit
                : ""
            }
            currency={formData?.contractCurrency}
            disabled={isDisabled}
            autoComplete="off"
          />
          <span
            className={`text-secondary text-xs px-1 ${
              calculateMoneySaved() !== "0.00" ? "block" : "hidden"
            }`}
          >
            Saved: {calculateMoneySaved()} {formData?.contractCurrency}
          </span>
        </div>
      )}
      {vat && (
        <div className="flex flex-col gap-1">
          <CalculationInputField
            label="Vat(%)"
            name="contractVatPercent"
            formData={formData}
            onChange={handleOnChange}
            calculate
            unit={
              formData?.contractVatPercent?.toString().length > 0 ? "%" : ""
            }
            disabled={isDisabled}
            autoComplete="off"
          />
          <span
            className={`text-secondary text-xs px-1 ${
              calculateTotalPrice() !== "0.00" ? "block" : "hidden"
            }`}
          >
            Total Price: {calculateTotalPrice()}{" "}
            {formData?.contractCurrency}{" "}
          </span>
        </div>
      )}
    </div>
  );
};

export default PriceCalculationComp;
