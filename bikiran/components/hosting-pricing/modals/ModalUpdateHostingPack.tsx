/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiUpdateHostingPackage } from "../HostingOperation";
import { THostingPkg } from "../HostingTypes";
import { useHosting } from "../context/HostingPricingProvider";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedInputField, CalculationInputField } from "bik-inputs";
import { Button } from "bik-button";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { authInfo } = useAuth2();
  const { setMessage, modalData } = useTemplate();
  const { reload, hostingPriceData } = useHosting();

  const subTypes = hostingPriceData.subTypes;
  const diskTypes = hostingPriceData.diskTypes;

  const updateHostingPackage = (payload: any) => {
    setLoading(true);
    setMessage("Updating...");
    ApiUpdateHostingPackage(authInfo, modalData.id, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const [formData, setFormData] = useState<THostingPkg>({
    id: modalData?.id,
    status: modalData?.status,
    title: modalData?.title,
    minDuration: modalData?.minDuration,
    selectedDuration: modalData?.selectedDuration,
    price: modalData?.price,
    pricePromotion: modalData?.pricePromotion,
    priceSetup: modalData?.priceSetup,
    priceRestore: modalData?.priceRestore,
    subType: modalData?.subType,
    disk: modalData?.disk,
    bandwidth: modalData?.bandwidth,
    cpu: modalData?.cpu,
    ram: modalData?.ram,
    diskType: modalData?.diskType,
    ep: modalData?.ep,
    io: modalData?.io,
    location: modalData?.location,
  });

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateHostingPackage(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex gap-2">
        <AnimatedInputField
          label="Title"
          name="title"
          formData={formData}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2">
        <CalculationInputField
          label="Promotion Price"
          name="pricePromotion"
          currency="USD"
          placeholder="Enter promotion price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Price"
          name="price"
          currency="USD"
          placeholder="Enter price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Setup Price"
          name="priceSetup"
          currency="USD"
          placeholder="Enter setup price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Restore Price"
          name="priceRestore"
          currency="USD"
          placeholder="Enter restore price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>

      <div className="flex gap-2">
        <CalculationInputField
          label="Min Duration (months)"
          name="minDuration"
          placeholder="Enter min duration"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Selected Duration (months)"
          name="selectedDuration"
          placeholder="Enter selected duration"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>

      <div className="flex gap-2">
        <SelectField
          formData={formData}
          label={""}
          name="subType"
          className="w-[227px] -mt-1"
          onChange={handleChange}
          options={subTypes.map((item) => addOption(item, item, item))}
        />
        <AnimatedInputField
          label="Disk (MB)"
          name="disk"
          formData={formData}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2">
        <AnimatedInputField
          label="Bandwidth (MB)"
          name="bandwidth"
          formData={formData}
          onChange={handleChange}
        />
        <AnimatedInputField
          label="CPU (cores)"
          name="cpu"
          formData={formData}
          onChange={handleChange}
        />
      </div>

      <div className="flex gap-2">
        <AnimatedInputField
          label="RAM (GB)"
          name="ram"
          formData={formData}
          onChange={handleChange}
        />
        <SelectField
          formData={formData}
          label={""}
          name="diskType"
          className="w-[227px] -mt-1"
          onChange={handleChange}
          options={diskTypes.map((item) => addOption(item, item, item))}
        />
      </div>

      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10"
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Update"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalUpdateHostingPackage: FC<{}> = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog
      open={modalType === "update-hosting-package"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Package</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateHostingPackage;
