import { FC, useState, useEffect, useMemo } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { ApiUpdatePricing } from "../DomainListOperation";
import { useDomainList } from "../context/DomainListProvider";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import { TDomainListItem } from "../domainListTypes";
import { showCurrencySign, showInt } from "@/bik-lib/utils/show";
import { round } from "@/bik-lib/utils/math";
import { AnimatedInputField, CalculationInputField } from "bik-inputs";
import { Button } from "bik-button";

type TUpdateDomainPayload = {
  contractCurrency: string;
  contractCurrencyRate: number;
  contractPrice: number;
  contractVatPercent: number;
  contractPriceUSD: number;
  contractPriceOfferUSD: number;
};

type TProps = {
  closeModal: () => void;
  modalData: TDomainListItem;
  setMessage: (message: string) => void;
};

const ModalContent: FC<TProps> = ({ closeModal, modalData, setMessage }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const defaultFormData: TUpdateDomainPayload = {
    contractCurrency: modalData?.contractCurrency || "",
    contractCurrencyRate: modalData?.contractCurrencyRate || 0,
    contractPrice: 0,
    contractPriceUSD: round(modalData?.contractPriceUSD || 0),
    contractVatPercent: modalData?.contractVatPercent || 0,
    contractPriceOfferUSD: round(modalData?.contractPriceOfferUSD || 0),
  };
  const [formData, setFormData] = useState<TUpdateDomainPayload>({
    ...defaultFormData,
  });
  const { authInfo, chkLoginReq } = useAuth2();
  const { reload, currencies } = useDomainList();

  // For changing the currency rate according to the currency
  useEffect(() => {
    if (formData.contractCurrency === "USD") {
      setFormData((prev) => ({
        ...prev,
        contractCurrencyRate:
          currencies.find((item) => item.currency === "USD")?.rate || 0,
      }));
    } else if (formData.contractCurrency === "BDT") {
      setFormData((prev) => ({
        ...prev,
        contractCurrencyRate: modalData?.contractCurrencyRate || 0,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        contractCurrencyRate:
          currencies.find((item) => item.currency === "INR")?.rate || 0,
      }));
    }
  }, [formData.contractPriceUSD, formData.contractCurrency]);

  // it will update the price according to the currency
  const price = useMemo(() => {
    if (formData.contractCurrency !== "USD") {
      setFormData((prev) => ({
        ...prev,
        contractPrice: formData.contractPriceUSD,
      }));
      return formData.contractPriceOfferUSD * formData.contractCurrencyRate;
    }
    setFormData((prev) => ({
      ...prev,
      contractPrice: formData.contractPriceUSD,
    }));
    return formData.contractPriceOfferUSD;
  }, [
    formData.contractPriceUSD,
    formData.contractCurrencyRate,
    formData.contractPriceOfferUSD,
  ]);

  // it will calculate the final price with vat
  const finalPrice = useMemo(() => {
    if (formData.contractCurrency !== "USD") {
      return price + price * (formData.contractVatPercent / 100);
    } else if (formData.contractCurrency === "USD") {
      return (
        Number(formData.contractPriceOfferUSD) +
        Number(formData.contractPriceOfferUSD) *
          (formData.contractVatPercent / 100)
      );
    }
  }, [
    price,
    formData.contractCurrency,
    formData.contractVatPercent,
    formData.contractPriceOfferUSD,
  ]);

  // it will handle the change of the input fields
  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    setMessage("Updating Subscription...");
    setLoading(true);
    const payload = {
      ...formData,
    };
    ApiUpdatePricing(authInfo, chkLoginReq, modalData?.id.toString(), payload)
      .then(({ message }) => {
        setMessage(message || "Update Successful");
        closeModal();
        reload();
      })
      .catch((error: Error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      <div className="flex item-center gap-1.5">
        <div className="space-y-4 flex-col flex justify-start w-[262px]  pr-3">
          <div className="text-primary text-base font-medium">
            Local Currency
          </div>
          <SelectField
            formData={formData}
            label=""
            className="w-full -mt-1"
            name="contractCurrency"
            onChange={handleOnChange}
            options={currencies.map((item) =>
              addOption(item.currency, item.currency, item.currency)
            )}
          />
          <CalculationInputField
            formData={formData}
            label="Currency Rate"
            calculate
            name="contractCurrencyRate"
            onChange={handleOnChange}
            readOnly={formData.contractCurrency === "USD"}
          />
        </div>
        <div className="h-auto w-[1px] bg-primary-300 flex-shrink-0"> </div>
        <div className="space-y-4 flex-col flex justify-start w-[262px] pl-3">
          <div className="text-primary text-base font-medium">Price</div>
          <CalculationInputField
            formData={formData}
            calculate
            label="Price"
            name="contractPriceUSD"
            currency="USD"
            unit="12 month"
            onChange={handleOnChange}
          />
          <div>
            <AnimatedInputField
              formData={formData}
              label="Discounted Price "
              calculate
              currency="USD"
              unit="12 month"
              show={true}
              name="contractPriceOfferUSD"
              onChange={handleOnChange}
              readOnly={formData.contractCurrency === "USD"}
            />
            <div className="px-1">
              <div>
                <span className="text-xs text-[#FF6F00]">
                  {(
                    ((formData.contractPriceUSD -
                      formData.contractPriceOfferUSD) /
                      formData.contractPriceUSD) *
                    100
                  ).toFixed(2)}
                  % ,{" "}
                </span>
                <span className="text-xs text-[#FF6F00]">
                  {formData.contractCurrency !== "USD" ? (
                    <span>
                      {showCurrencySign(formData.contractCurrency)}
                      {(
                        (formData.contractPriceUSD -
                          formData.contractPriceOfferUSD) *
                        formData.contractCurrencyRate
                      ).toFixed(2)}
                      ,{" "}
                    </span>
                  ) : null}
                  {showCurrencySign("USD")}
                  {(
                    formData.contractPriceUSD - formData.contractPriceOfferUSD
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <div>
            <AnimatedInputField
              formData={formData}
              calculate
              label="Vat(%)"
              currency="%"
              show={true}
              name="contractVatPercent"
              onChange={handleOnChange}
            />
            <div className="flex items-center gap-2 ">
              {formData.contractCurrency !== "USD" ? (
                <div>
                  <span className="text-xs text-[#FF6F00]">
                    {showCurrencySign(formData.contractCurrency)}{" "}
                  </span>
                  <span className="text-xs text-[#FF6F00]">
                    {finalPrice ? (finalPrice - price).toFixed(2) : 0}
                  </span>
                </div>
              ) : null}
              <div>
                <span className="text-xs text-[#FF6F00]">
                  {showCurrencySign("USD")}{" "}
                </span>
                <span className="text-xs text-[#FF6F00]">
                  {(
                    Number(formData.contractPriceOfferUSD) *
                    (formData.contractVatPercent / 100)
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="text-primary text-base font-medium">Overview</div>
        <div className="flex items-center gap-3">
          <div className="rounded-15 bg-secondary-50 gap-1 flex flex-col justify-center items-center w-[263px] h-[125px]">
            <div className="text-sm text-center">Price</div>
            <div className="font-semibold text-secondary text-3xl flex items-center gap-1">
              <span className="!text-2xl">
                {showCurrencySign(formData.contractCurrency)}
              </span>
              {showInt(price)}
            </div>
            <span className="text-base font-semibold text-secondary">
              /{modalData?.contractDuration} {modalData?.contractUnitName}
            </span>
          </div>
          <div className="rounded-15 flex justify-center items-center  gap-1 flex-col bg-secondary-50 w-[263px] h-[125px]">
            <div className="text-sm text-center">Price with VAT</div>
            <div className="font-semibold text-secondary text-3xl flex items-center gap-1">
              <span className="!text-2xl">
                {showCurrencySign(formData.contractCurrency)}{" "}
              </span>
              {showInt(finalPrice ?? 0)}
            </div>
            <span className="text-base font-semibold text-secondary">
              /{modalData?.contractDuration} {modalData?.contractUnitName}
            </span>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          loading={loading}
          onClick={handleSubmit}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalUpdateDomainPricing: FC = () => {
  const { modalType, closeModal, modalData, setMessage } = useTemplate();
  return (
    <Dialog
      open={modalType === "domain-subscription-update"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="!max-w-fit">
        <DialogHeader>
          <DialogTitle>Update Pricing</DialogTitle>
          <span className=" modal-subtitle">{modalData?.domainName}</span>
        </DialogHeader>
        <DialogBody className="min-h-1 w-full">
          <ModalContent
            closeModal={closeModal}
            modalData={modalData}
            setMessage={setMessage}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateDomainPricing;
