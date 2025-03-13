/* eslint-disable no-unused-vars */
"use client";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import {
  ApiCreateApplication,
  ApiUploadApplicationLogo,
} from "../ApplicationApiOperation";
import React, { FC, FormEvent, useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Input } from "../../ui/input";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { LoadingRoundDottedIcon } from "@/bik-lib/features/Profile/icons";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useApplicationInfo } from "../../manage-application-info/ApplicationInfoProvider";
import { InputField } from "bik-inputs";
import { Button } from "bik-button";

const ModalContent = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const { handleReload } = useApplicationInfo();
  const [loading, setLoading] = useState(false);
  const { authInfo } = useAuth2();
  const { setMessage, closeModal } = useTemplate();

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

  // upload image
  const handleUploadLogo = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      const fileData = new FormData();
      fileData.append("file", file);

      setUploading(true);
      ApiUploadApplicationLogo(authInfo, fileData)
        .then(async ({ data }) => {
          setUploading(false);
          setFormData((prev) => {
            return {
              ...prev,
              logoUrl: data?.publicUrl,
            };
          });
          handleReload();
        })
        .catch((ex) => {
          setUploading(false);
          setMessage(ex.message);
          // filed then input will be cleared
          e.target.value = "";
        });
    }
  };

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);
    ApiCreateApplication(authInfo, formData)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        handleReload();
      })
      .catch((ex) => {
        setLoading(false);
        setMessage(ex.message);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex items-end gap-2">
        <div className="flex flex-col  w-[calc(100%_-_40px_-_8px)] custom-field relative">
          <label
            htmlFor="uploadImage"
            className="pl-1 mb-1 text-sm md:text-base capitalize w-full font-normal text-left"
          >
            Logo
          </label>
          <Input
            id="uploadImage"
            type="file"
            name="uploadImage"
            onChange={handleUploadLogo}
            accept="image/*"
            className="h-10 disabled:bg-primary-50 disabled:text-primary-700 disabled:pointer-events-none shadow-none cursor-pointer"
            disabled={uploading}
          />
          {uploading && (
            <span className="absolute flex w-10 top-7 left-2 text-base text-primary rounded-lg h-10">
              <LoadingRoundDottedIcon />
            </span>
          )}
        </div>
        <div className="size-10 border border-primary-200 overflow-hidden rounded-5">
          <Image
            src={formData.logoUrl || icons.iconDefaultApp}
            alt="application logo"
            width={100}
            height={100}
            className="size-full"
          />
        </div>
      </div>
      <InputField
        label="Application Title"
        name="title"
        formData={formData}
        onChange={handleChange}
        placeholder="Application Title"
        // required
      />

      <InputField
        label="Application Unique name"
        name="uniqueName"
        formData={formData}
        onChange={handleChange}
        placeholder="Application Unique Name"
        // required
      />

      <InputField
        label="Website URL"
        name="websiteUrl"
        formData={formData}
        onChange={handleChange}
        placeholder="Website url"
        // required
      />
      <div className="flex items-center justify-end gap-2.5">
        <Button
          variant="gray"
          onClick={() => closeModal()}
          disabled={loading}
          className="w-28 h-9"
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

const ModalAddApplication: FC = () => {
  const { modalType, closeModal } = useTemplate();

  return (
    <Dialog open={modalType === "add-application"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add New Application</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddApplication;
