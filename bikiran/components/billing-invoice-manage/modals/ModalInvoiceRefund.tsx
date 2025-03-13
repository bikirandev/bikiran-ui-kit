import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useInvoiceInfo } from "../context/InvoiceManageProvider";
import { CalculationInputField, InputField } from "bik-inputs";
import { Button } from "bik-button";
import { UserInfoComp } from "bik-utils";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { cn } from "@/bik-lib/utils/cn";
import {
  ApiRefundPayment,
  ApiRefundVatPayment,
} from "../InvoiceManageOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TPayment } from "../invoiceManageTypes";

type TProps = {
  closeModal: () => void;
};
const refundOptions = [
  { value: "principal", label: "Principal Amount" },
  { value: "vat", label: "VAT Amount" },
];

const ModalContent: FC<TProps> = ({ closeModal }) => {
  const { invoiceInfo, reload } = useInvoiceInfo();
  const { authInfo, chkLoginReq } = useAuth2();
  const { setMessage } = useTemplate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    type: string;
    amount: number;
    vat: number;
  }>({
    amount: 0,
    type: "",
    vat: 0,
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const invoiceId = invoiceInfo.invoice.id;

  const payload: TPayment = {
    amount: formData.amount,
    payForce: true,
  };
  const handleRefundPayment = () => {
    setLoading(true);
    setMessage("Refund payment...");
    ApiRefundPayment(authInfo, chkLoginReq, invoiceId, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleVatRefundPayment = () => {
    setLoading(true);
    setMessage("Refund payment...");
    ApiRefundVatPayment(authInfo, chkLoginReq, invoiceId)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      <UserInfoComp
        ImageComponent={Image}
        email={invoiceInfo.addressBilling.email}
        name={invoiceInfo.addressBilling.name}
        photoUrl={icons.iconUser}
      />
      <div className="flex justify-between items-center">
        <div className="text-primary-700 ">Balance</div>
        <div className="font-medium">
          {invoiceInfo.invoice.localCurrency} : 0.00
        </div>
      </div>

      <RadioGroup
        onValueChange={(value) => {
          setFormData((prev) => ({
            ...prev,
            type: value,
          }));
        }}
      >
        {refundOptions.map(({ value, label }) => (
          <div
            key={value}
            className={cn(
              "flex items-center hover:bg-[rgba(245,0,87,.05)] rounded-8 h-10 px-2 -ml-2 cursor-pointer"
            )}
          >
            <RadioGroupItem
              value={value}
              id={value}
              className="border-[#f50057] text-[#f50057] size-5"
            />
            <label
              htmlFor={value}
              className="w-full cursor-pointer flex items-center h-full pl-2"
            >
              {label}
            </label>
          </div>
        ))}
      </RadioGroup>
      <div className="flex item-center gap-2">
        {formData.type === "vat" && (
          <CalculationInputField
            calculate
            label="Enter Amount"
            name="vat"
            disabled={formData.type === "vat"}
            placeholder="Enter Amount"
            formData={formData}
            onChange={handleOnChange}
          />
        )}
        {formData.type !== "vat" && (
          <CalculationInputField
            calculate
            label="Enter Amount"
            name="amount"
            placeholder="Enter Amount"
            disabled={!formData.type}
            formData={formData}
            onChange={handleOnChange}
          />
        )}
        <div className="w-[227px] flex-shrink-0 bg-secondary-50 flex items-center text-secondary font-medium px-4 rounded-8">
          {invoiceInfo.invoice.localCurrency}:
          {formData.type === "vat"
            ? invoiceInfo.invoice.totalVat
            : formData.amount}
        </div>
      </div>
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          // disabled={loading} // if you have loading state
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          onClick={
            formData.type === "vat"
              ? handleVatRefundPayment
              : handleRefundPayment
          }
          loading={loading}
          disabled={loading}
        >
          Refund
        </Button>
      </div>
    </div>
  );
};

const ModalInvoiceRefund = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "invoice-refund"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Refund</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalInvoiceRefund;
