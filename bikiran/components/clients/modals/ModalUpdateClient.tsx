"use client";

import React, { FC, useState } from "react";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";

import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { ApiUpdateClientInfo } from "../ClientInfoOperations";
import { useClientInfo } from "../context/ClientInfoProvider";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { InputField } from "bik-inputs";
import { Button } from "bik-button";

const ModalContent = () => {
  const [loading, setLoading] = useState(false);
  const { authInfo } = useAuth2();
  const { setMessage, closeModal, modalData } = useTemplate();
  const { reFetch } = useClientInfo();

  const [formData, setFormData] = useState({
    id: modalData?.id || 0,
    organizationName: modalData?.organizationName || "",
    organizationKey: modalData?.organizationKey || "",
    services: modalData?.services || "",
    status: modalData?.status || "",
    timeCreated: modalData?.timeCreated || 0,
  });

  const handleChange = (ev: any) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (ev: any) => {
    ev.preventDefault();
    setLoading(true);
    ApiUpdateClientInfo(
      authInfo,
      modalData?.id.toString() as unknown as "",
      formData
    )
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reFetch();
      })
      .catch((ex) => {
        setLoading(false);
        setMessage(ex.message);
      });
  };

  const status = [
    { id: "0", title: "inactive" },
    { id: "1", title: "active" },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        label="Organization Name"
        name="organizationName"
        formData={formData}
        onChange={handleChange}
        placeholder="Organization Name"
      />
      <InputField
        label="Organization Key"
        name="organizationKey"
        formData={formData}
        onChange={handleChange}
        placeholder="Organization Key"
        // required
      />
      <InputField
        label="Services"
        name="services"
        formData={formData}
        onChange={handleChange}
        placeholder="Services"
        // required
      />
      <SelectField
        formData={formData}
        label=""
        name="status"
        onChange={handleChange}
        options={
          status.map((item) =>
            addOption(item.id, capitalizeFirstLetter(item.title), item.title)
          ) || []
        }
      />
      <div className="flex items-center justify-end gap-2.5">
        <Button
          variant="gray"
          onClick={() => closeModal()}
          className="w-28 h-9"
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          type="submit"
          loading={loading}
          className="w-28 h-9"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

const ModalUpdateClient: FC = () => {
  const { modalType, closeModal, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "update-client"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Client</DialogTitle>
          <span className=" modal-subtitle">{modalData?.organizationName}</span>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateClient;
