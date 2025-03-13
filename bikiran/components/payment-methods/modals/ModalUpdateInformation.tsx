import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { AnimatedInputField } from "bik-inputs";
import { Button } from "bik-button";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { ApiUpdateBasicInformation } from "../PaymentMethodOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { usePaymentMethod } from "../context/PaymentMethodProvider";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { Checkbox } from "../../ui/checkbox";
import { cn } from "@/bik-lib/utils/cn";

type TProps = {
  closeModal: () => void;
  modalData: any;
  setMessage: (message: string) => void;
};

const ModalContent: FC<TProps> = ({ closeModal, modalData, setMessage }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    title: string;
    subTitle: string;
    buttonText: string;
    isDefault: boolean;
  }>({
    title: modalData?.title,
    subTitle: modalData?.subTitle,
    buttonText: modalData?.buttonText,
    isDefault: modalData?.isDefault,
  });

  const { authInfo } = useAuth2();
  const { reload } = usePaymentMethod();

  const handleOnChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    ApiUpdateBasicInformation(authInfo, modalData.id, formData)
      .then(() => {
        setMessage("Updating Information");
        reload();
        closeModal();
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
      <AnimatedInputField
        formData={formData}
        label={"Title"}
        name="title"
        onChange={handleOnChange}
        className="mt-2"
      />
      <AnimatedInputField
        formData={formData}
        label={"Subtitle"}
        name="subTitle"
        onChange={handleOnChange}
      />
      <AnimatedInputField
        formData={formData}
        label={"Button Text"}
        name="buttonText"
        onChange={handleOnChange}
      />
      <div className="flex items-center gap-2">
        <label htmlFor="">Is Default</label>
        <Checkbox
          className={`border-primary ring-0 data-[state=checked]:border-secondary  data-[state=checked]:bg-secondary data-[state=checked]:text-white`}
          onClick={() =>
            setFormData((prev) => ({ ...prev, isDefault: !prev.isDefault }))
          }
          checked={formData.isDefault}
        />
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

const ModalUpdateInformation = () => {
  const { closeModal, modalType, modalData, setMessage } = useTemplate();
  return (
    <Dialog
      open={modalType === "update-payment-info"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Information</DialogTitle>
        </DialogHeader>
        <DialogBody className="min-h-1">
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

export default ModalUpdateInformation;
