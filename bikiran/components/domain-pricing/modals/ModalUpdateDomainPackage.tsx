/* eslint-disable no-unused-vars */
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiUpdateDomainPackage } from "../DomainOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TDomainPackagePayload, TDomainPrice } from "../DomainTypes";
import { useDomain } from "../context/DomainPricingProvider";
import { addOption } from "@/bik-lib/utils/option";
import { CalculationInputField } from "bik-inputs";
import { Button } from "bik-button";

const ModalBody: FC<{
  closeModal: () => void;
  setMessage: (message: string) => void;
  modalData: TDomainPrice;
}> = ({ closeModal, setMessage, modalData }) => {
  const [formData, setFormData] = useState<TDomainPackagePayload>({
    price: modalData?.price || 0,
    promotionPrice: modalData?.promotionPrice || 0,
    transferPrice: modalData?.transferPrice || 0,
    redemptionPrice: modalData?.redemptionPrice || 0,
    restorePrice: modalData?.restorePrice || 0,
    minDuration: modalData?.minDuration || 0,
    defaultDuration: modalData?.defaultDuration || 0,
    vendor: modalData?.vendor || "",
  });
  const [loading, setLoading] = useState(false);
  const { authInfo } = useAuth2();

  const { vendorData, reFetch } = useDomain();

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  //update Domain Package
  const updateDomainPackage = (formData: TDomainPackagePayload) => {
    const {
      defaultDuration,
      minDuration,
      price,
      promotionPrice,
      redemptionPrice,
      restorePrice,
      transferPrice,
      vendor,
    } = formData;
    const payload = {
      defaultDuration: parseFloat(defaultDuration.toString()),
      minDuration: parseFloat(minDuration.toString()),
      price: parseFloat(price.toString()),
      promotionPrice: parseFloat(promotionPrice.toString()),
      redemptionPrice: parseFloat(redemptionPrice.toString()),
      restorePrice: parseFloat(restorePrice.toString()),
      transferPrice: parseFloat(transferPrice.toString()),
      vendor: vendor,
    };
    setLoading(true);
    setMessage("Creating project...");
    ApiUpdateDomainPackage(authInfo, modalData?.id.toString() || "", payload)
      .then(({ message }) => {
        if (message) {
          setMessage(message);
        }
        closeModal();
        reFetch();
      })
      .catch((err) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateDomainPackage(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex gap-2">
        <CalculationInputField
          label="Promotion Price"
          name="promotionPrice"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Renew Price"
          name="price"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Transfer Price"
          name="transferPrice"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Redemption Price"
          name="redemptionPrice"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Restore Price"
          name="restorePrice"
          currency="USD"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="flex gap-2">
        <CalculationInputField
          label="Min Duration"
          name="minDuration"
          formData={formData}
          onChange={handleChange}
          calculate
        />
        <CalculationInputField
          label="Default Duration"
          name="defaultDuration"
          formData={formData}
          onChange={handleChange}
          calculate
        />
      </div>
      <div className="w-full items-center">
        <SelectField
          label=""
          name="vendor"
          placeholder="Select Vendor"
          className="w-full"
          options={vendorData.map((item) =>
            addOption(item.id, item.vendorTitle, item.id)
          )}
          formData={formData}
          onChange={handleChange}
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

const ModalUpdateDomainPackage: FC = () => {
  const { closeModal, setMessage, modalType, modalData } = useTemplate();

  return (
    <Dialog
      open={modalType === "update-domain-package"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Domain Package</DialogTitle>
          <span className=" modal-subtitle">{modalData?.tld}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody
            closeModal={closeModal}
            setMessage={setMessage}
            modalData={modalData}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateDomainPackage;
