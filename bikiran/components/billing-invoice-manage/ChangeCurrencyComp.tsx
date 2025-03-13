import { cn } from "@/bik-lib/utils/cn";
import { icons } from "@/bikiran/lib/icons";
import { Button } from "bik-button";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { addOption } from "@/bik-lib/utils/option";
import { InputField } from "bik-inputs";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { InformationTooltip } from "bik-utils";
import { FC, useEffect, useState } from "react";
import { ApiUpdateInvoiceCurrency } from "./InvoiceManageOperation";
import Image from "next/image";
import SectionLoadingComp from "./SectionLoadingComp";

const currencies = [
  { id: 0, currency: "BDT" },
  { id: 1, currency: "USD" },
];

const CurrencyRow: FC<{
  formData: any;
  loading: boolean;
  handleOnChange: (e: TInputChangeEvent) => void;
}> = ({ formData, handleOnChange, loading }) => {
  return (
    <div className="flex justify-between items-start">
      <div className=" flex items-center my-auto">
        <span className="text-primary text-base font-medium ">Currency</span>
        <InformationTooltip
          content="Current Rate 1 USD = 120"
          // className="!h-[60px]"
          align="top"
        >
          <Image
            src={icons.iconInfoLine}
            alt="eye"
            width={0}
            height={0}
            sizes="100vh"
            className="size-5 m-2"
          />
        </InformationTooltip>
      </div>
      <div className="flex  items-start justify-end">
        <SelectField
          label=""
          name="currency"
          placeholder="Select Currency"
          className="w-42 !h-10"
          disabled={loading}
          options={
            currencies?.map(({ currency }) =>
              addOption(currency, currency, currency)
            ) || []
          }
          formData={formData}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};

const ChangeCurrencyComp: FC = () => {
  const { invoice: data, loading, reload } = useInvoiceInfo();

  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState<{
    currency: string;
    rate: number;
  }>({
    currency: data?.localCurrency,
    rate: 0,
  });

  const { setMessage } = useTemplate();

  const { authInfo, chkLoginReq } = useAuth2();

  const handleOnChange = (e: TInputChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      currency: data?.localCurrency,
      rate: data?.convertRatio,
    }));
  }, [data]);

  useEffect(() => {
    if (formData.currency === "USD") {
      setFormData((prev) => ({
        ...prev,
        rate: 1,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        rate: data?.convertRatio,
      }));
    }
  }, [formData.currency]);

  const payload = {
    currency: formData.currency,
    rate: Number(formData.rate) || 0,
  };
  const invoiceId = data?.id?.toString();
  const handleSave = () => {
    setUpdating(true);
    ApiUpdateInvoiceCurrency(authInfo, chkLoginReq, invoiceId, payload)
      .then(({ message }) => {
        setMessage(message);
        reload(-4);
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const resetCurrency = () => {
    setFormData((prev) => ({
      ...prev,
      currency: data?.localCurrency,
    }));
  };

  const isDisabled = () => {
    if (
      Number(formData.rate) !== data?.convertRatio &&
      formData.currency !== "USD"
    ) {
      return false;
    } else if (formData.currency === data?.localCurrency) {
      return true;
    }
    return false;
  };

  return (
    <div className="invoice-action-cont relative">
      {/* Loading while updating */}
      {updating && <SectionLoadingComp />}

      <div className="space-y-2">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-primary text-xl font-medium ">Change Currency</h2>
        </div>

        <div>
          <CurrencyRow
            formData={formData}
            handleOnChange={handleOnChange}
            loading={loading}
          />
          <div className="w-full flex justify-between items-center">
            <InputField
              label="Custom Rate"
              placeholder="Current Rate"
              name="rate"
              parentClassName="flex items-center justify-between"
              className="!w-42 !h-10"
              formData={formData}
              onChange={handleOnChange}
              disabled={formData.currency === "USD"}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex justify-end gap-2 max-h-0 overflow-hidden transition-all",
            {
              "max-h-8": !isDisabled(),
            }
          )}
        >
          <Button
            type="reset"
            className="w-20 h-8 flex justify-center items-center text-sm py-2"
            variant="gray"
            onClick={resetCurrency}
          >
            Reset
          </Button>
          <Button
            className="w-20 h-8 flex justify-center items-center text-sm py-2"
            variant="secondary"
            disabled={isDisabled()}
            loading={updating}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChangeCurrencyComp;
