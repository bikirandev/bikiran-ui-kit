/* eslint-disable no-unused-vars */
"use client";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import React, { FC, FormEvent, useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { SelectField } from "@/bik-lib/lib/InputFields";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { ApiAddClientInfo } from "../ClientInfoOperations";
import { useClientInfo } from "../context/ClientInfoProvider";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { InputField } from "bik-inputs";
import { Button } from "bik-button";

const ModalContent = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const { authInfo } = useAuth2();
  const { setMessage, closeModal } = useTemplate();

  const { reFetch, status } = useClientInfo();

  const [formData, setFormData] = useState({
    title: "",
    uniqueName: "",
    websiteUrl: "",
    logoUrl: "",
  });

  const handleChange = (ev: any) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    ApiAddClientInfo(authInfo, formData)
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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <InputField
        label="Organization Name"
        name="organizationName"
        formData={formData}
        onChange={handleChange}
        placeholder="Organization Name"
        // required
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
        label={"Status"}
        placeholder="Select Status"
        name="status"
        onChange={handleChange}
        className="w-full"
        options={
          status.map((item) =>
            addOption(item, capitalizeFirstLetter(item), item)
          ) || []
        }
      />
      <div className="flex items-center justify-end gap-2.5">
        <Button
          variant="gray"
          onClick={() => closeModal()}
          disabled={loading}
          className="px-[15px] py-2"
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          type="submit"
          loading={loading}
          className="px-[15px] py-2"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

const ModalAddClient: FC = () => {
  const { modalType, closeModal } = useTemplate();

  return (
    <Dialog open={modalType === "add-client"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddClient;
