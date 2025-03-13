import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import React, { FC, useState } from "react";
import { InputField } from "bik-inputs";
import { Button } from "bik-button";
import { useManagePermission } from "../context/ManagePermissionProvider";
import { ApiAddPermission } from "../ManagePermissionOperation";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const { authInfo } = useAuth2();
  const { modalData, setMessage } = useTemplate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    currencyId: "",
    newRate: modalData?.rate || "",
  });
  const { reload } = useManagePermission();
  const updateStatus = (payload: any) => {
    setLoading(true);
    setMessage("Updating...");
    ApiAddPermission(authInfo, formData.newRate)
      .then(({ message }) => {
        reload();
        closeModal();
        setMessage(message);
      })
      .catch((err) => {
        setMessage(err.message);
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
    updateStatus(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <InputField
        type="text"
        label="Email"
        name="email"
        placeholder="Enter Email"
        formData={formData}
        onChange={handleChange}
      />
      <InputField
        type="text"
        label="Asset Name"
        name="assetKey"
        placeholder="Enter AssetKey name"
        formData={formData}
        onChange={handleChange}
      />

      <InputField
        type="text"
        label="Role"
        name="role"
        placeholder="Enter Role"
        formData={formData}
        onChange={handleChange}
      />
      <InputField
        type="text"
        label="Permissions"
        name="permissions"
        placeholder="Enter permissions"
        formData={formData}
        onChange={handleChange}
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
          title="Update"
          className="w-[100px] h-10"
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const AddNewRoleModal = () => {
  const { modalType, closeModal, setMessage, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "add-role"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Add New Role</DialogTitle>
          <span className=" modal-subtitle">{modalData?.title}</span>
        </DialogHeader>
        <DialogBody>
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default AddNewRoleModal;
