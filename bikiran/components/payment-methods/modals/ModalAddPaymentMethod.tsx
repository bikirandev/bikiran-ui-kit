import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TPaymentMethod } from "../PaymentMethodTypes";
import SetCurrencyModalComp from "../../domain-list/modals/UserSetCurrencyModalComp";
import { AnimatedInputField } from "bik-inputs";
import { Button } from "bik-button";

type TProps = {
  closeModal: () => void;
  modalData: TPaymentMethod;
  setMessage: (message: string) => void;
};

const ModalContent: FC<TProps> = ({ closeModal, modalData, setMessage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>("");

  const handleChange = () => {
    setFormData((prev: any) => ({ ...prev, ...formData }));
  };

  const updateStatus = () => {
    setLoading(true);
    setMessage("Updating status...");
    if (modalData.id > 0) {
      // ApiUpdatePaymentStatus(authInfo, modalData.id || 0, status)
      //   .then(() => {
      //     reload();
      //     closeModal();
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   })
      //   .finally(() => {
      //     setLoading(false);
      //   });
    }
  };

  return (
    <div className="space-y-3">
      <AnimatedInputField
        formData={formData}
        name="providerName"
        label="Provider Name"
        onChange={handleChange}
      />
      <AnimatedInputField
        formData={formData}
        name="title"
        label="Title"
        onChange={handleChange}
      />{" "}
      <AnimatedInputField
        formData={formData}
        name="sub-title"
        label="Sub Title"
        onChange={handleChange}
      />
      <SetCurrencyModalComp
        handleOnChange={handleChange}
        formData={formData}
        setFormData={setFormData}
      />
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
          variant={"secondary"}
          className="w-24 h-10"
          loading={loading}
          onClick={updateStatus}
        >
          Add
        </Button>
      </div>
    </div>
  );
};

const ModalAddPaymentMethod = () => {
  const { closeModal, modalType, modalData, setMessage } = useTemplate();
  return (
    <Dialog open={modalType === "add-payment-method"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>
        <DialogBody className="min-h-10">
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

export default ModalAddPaymentMethod;
