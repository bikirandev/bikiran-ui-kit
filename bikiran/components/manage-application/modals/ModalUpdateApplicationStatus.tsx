"use client";

import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { addOption } from "@/bik-lib/utils/option";
import { useManageApp } from "../context/ManageApplicationProvider";
import { ApiUpdateStatusApplication } from "../ApplicationApiOperation";
import { AnimatedTextArea } from "bik-inputs";
import { Button } from "bik-button";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { reFetch } = useManageApp();
  const { authInfo } = useAuth2();
  const { modalData, setMessage } = useTemplate();
  const [formData, setFormData] = useState<any>({
    status: modalData?.status || "",
    note: modalData?.note || "",
  });

  const updateHostingStatus = (payload: any) => {
    setLoading(true);
    setMessage("Updating...");
    ApiUpdateStatusApplication(authInfo, modalData.id, payload)
      .then(({ message }) => {
        setMessage(message);
        if (reFetch) {
          closeModal();
          reFetch();
        }
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
    updateHostingStatus(formData);
  };

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="w-full flex justify-between items-center">
        <span className=" font-medium text-base text-primary">Status</span>
        <SelectField
          formData={formData}
          label={""}
          placeholder="Select Status"
          name="status"
          onChange={handleOnChange}
          className="w-[223px]"
          options={["active", "inactive"].map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          )}
        />
      </div>
      <AnimatedTextArea
        formData={formData}
        name="note"
        label="Note"
        className="h-28"
        onChange={handleOnChange}
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
          title="Save"
          className="px-3 py-2"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalUpdateApplicationStatus: FC = () => {
  const { closeModal, modalType, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "update-app-status"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <span className=" modal-subtitle">{modalData?.title}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1 overflow-visible">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateApplicationStatus;
