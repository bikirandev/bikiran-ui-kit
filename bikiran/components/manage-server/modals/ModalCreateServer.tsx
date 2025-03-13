/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent, TState } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { raidLevels, TServerCreatePayload } from "../ManageServerType";
import { ApiCreateServer } from "../ManageServerOperation";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { useServerInfo } from "../context/ManageServerProvider";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { AnimatedInputField } from "bik-inputs";
import { Button } from "bik-button";

const ModalBody: React.FC<{
  closeModal: () => void;
  setMessage: (message: string) => void;
}> = ({ closeModal, setMessage }) => {
  const [formData, setFormData] = useState<TServerCreatePayload>({
    hostname: "",
    primaryIp: "",
    type: "",
    title: "",
    cpu: "",
    ram: "",
    storage: "",
    bandwidth: "",
    network: "",
    os: "",
    raid: "",
  });
  const [loading, setLoading] = useState(false);

  const { authInfo, chkLoginReq } = useAuth2();
  const { reload, serverType } = useServerInfo();

  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };
  const createServer = (payload: TServerCreatePayload) => {
    setLoading(true);
    setMessage("Creating server...");
    ApiCreateServer(authInfo, chkLoginReq, payload)
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
    createServer(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Hostname"}
          name="hostname"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          label={"Primary IP"}
          name="primaryIp"
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 items-center">
        <SelectField
          formData={formData}
          label={""}
          name="type"
          placeholder="Select Server Type"
          className="-mt-1"
          onChange={handleChange}
          options={serverType.map((type) =>
            addOption(type, capitalizeFirstLetter(type), type)
          )}
        />
        <AnimatedInputField
          formData={formData}
          label={"Server Title"}
          name="title"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Cpu"}
          name="cpu"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          label={"Ram"}
          name="ram"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Storage"}
          name="storage"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          label={"Bandwidth"}
          name="bandwidth"
          onChange={handleChange}
        />
      </div>
      <div className="flex gap-4">
        <AnimatedInputField
          formData={formData}
          label={"Network"}
          name="network"
          onChange={handleChange}
        />
        <AnimatedInputField
          formData={formData}
          label={"OS"}
          name="os"
          onChange={handleChange}
        />
      </div>
      <SelectField
        formData={formData}
        label={""}
        name="raid"
        placeholder="Select Raid"
        className="-mt-1"
        onChange={handleChange}
        options={raidLevels.map((items) =>
          addOption(items.id, capitalizeFirstLetter(items.title), items.value)
        )}
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

const ModalCreateServer: React.FC<{}> = () => {
  const { closeModal, setMessage, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "create-server"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader className="border-b">
          <DialogTitle className="text-primary text-xl font-medium">
            Create New Server
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} setMessage={setMessage} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateServer;
