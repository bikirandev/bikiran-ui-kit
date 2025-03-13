/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TServerData } from "../ManageServerType";
import { ApiUpdateServerStatus } from "../ManageServerOperation";
import { AnimateTextArea, SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import { useServerInfo } from "../context/ManageServerProvider";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { AnimatedTextArea } from "bik-inputs";
import { Button } from "bik-button";

type TUpdateStatus = {
  status: string;
  note: string;
};

const ModalBody: React.FC<{
  closeModal: () => void;
  setMessage: (message: string) => void;
  modalData: TServerData;
}> = ({ closeModal, setMessage, modalData }) => {
  const [formData, setFormData] = useState<TUpdateStatus>({
    status: modalData?.status || "",
    note: "",
  });
  const [loading, setLoading] = useState(false);

  const { authInfo, chkLoginReq } = useAuth2();
  const { reload, serverStatus } = useServerInfo();

  const id = modalData?.id || 0;

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const updateServerStatus = (payload: TUpdateStatus) => {
    setLoading(true);
    setMessage("Updating Server Status...");
    ApiUpdateServerStatus(
      authInfo,
      chkLoginReq,
      id.toString(),
      formData.status,
      formData.note
    )
      .then(({ message }) => {
        if (message) {
          setMessage(message);
        }
        if (reload) {
          reload();
        }
        closeModal();
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
    updateServerStatus(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex justify-between items-center">
        <label className="text-primary font-medium text-lg px-2">Status</label>
        <SelectField
          formData={formData}
          label={""}
          placeholder="Select Status"
          name="status"
          onChange={handleChange}
          className="w-[223px]"
          options={
            serverStatus.map((item) =>
              addOption(item, capitalizeFirstLetter(item), item)
            ) || []
          }
        />
      </div>
      <AnimatedTextArea
        formData={formData}
        label={"Note"}
        name="note"
        className="h-[115px] "
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
          className="px-3 py-2    "
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalUpdateStatus: React.FC<{}> = () => {
  const { closeModal, setMessage, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "update-status"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader className="border-b">
          <DialogTitle>Update Status</DialogTitle>
          <span className=" modal-subtitle">{modalData?.hostname}</span>
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

export default ModalUpdateStatus;
