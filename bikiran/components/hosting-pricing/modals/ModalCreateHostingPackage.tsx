/* eslint-disable no-unused-vars */
import React, { useState } from "react";
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
import { ApiCreateHostingPackage } from "../HostingOperation";
import { THostingPkg } from "../HostingTypes";
import { useHosting } from "../context/HostingPricingProvider";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedInputField, CalculationInputField } from "bik-inputs";
import { Button } from "bik-button";

const ModalBody: React.FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { hostingPriceData } = useHosting();
  const { authInfo } = useAuth2();
  const { setMessage } = useTemplate();
  const [formData, setFormData] = useState<THostingPkg>({} as THostingPkg);

  const subTypes = hostingPriceData.subTypes;
  const diskType = hostingPriceData.diskTypes;
  const locations = hostingPriceData.locations;

  const createHostingPackage = (payload: any) => {
    setLoading(true);
    setMessage("Creating...");
    ApiCreateHostingPackage(authInfo, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
      })
      .catch((err) => {
        setMessage(err.message);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    createHostingPackage(formData);
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
          label="Price"
          name="price"
          placeholder="Enter price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Promotion Price"
          name="pricePromotion"
          placeholder="Enter promotion price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Setup Price"
          name="priceSetup"
          placeholder="Enter setup price"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Restore Price"
          name="priceRestore"
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
          label=""
          name="subType"
          placeholder="Select SubType"
          className="w-[227px] -mt-1"
          onChange={handleChange}
          options={subTypes.map((item) => addOption(item, item, item))}
        />
        <CalculationInputField
          label="Disk (MB)"
          name="disk"
          placeholder="Enter disk size"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Bandwidth (MB)"
          name="bandwidth"
          placeholder="Enter bandwidth"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="CPU (cores)"
          name="cpu"
          placeholder="Enter CPU cores"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="RAM (GB)"
          name="ram"
          placeholder="Enter RAM size"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <SelectField
          formData={formData}
          label=""
          name="diskType"
          placeholder="Select Disk Type"
          className="w-[227px] -mt-1"
          onChange={handleChange}
          options={diskType.map((item) => addOption(item, item, item))}
        />
      </div>
      <div className="flex gap-2">
        <AnimatedInputField
          label="EP"
          name="ep"
          formData={formData}
          onChange={handleChange}
        />
        <AnimatedInputField
          type="text"
          label="IO"
          name="io"
          formData={formData}
          onChange={handleChange}
        />
      </div>
      <SelectField
        formData={formData}
        label=""
        name="location"
        placeholder="Select Location"
        onChange={handleChange}
        options={locations.map((item) => addOption(item, item, item))}
      />
      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10"
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Create"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalCreateHostingPackage: React.FC<{}> = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog
      open={modalType === "create-hosting-package"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader className="border-b">
          <DialogTitle className="text-primary text-xl font-medium">
            Create New Package
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateHostingPackage;
