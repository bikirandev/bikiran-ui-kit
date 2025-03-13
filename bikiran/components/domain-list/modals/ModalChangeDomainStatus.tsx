/* eslint-disable no-unused-vars */
import { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiChangeStatus } from "../DomainListOperation";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useDomainList } from "../context/DomainListProvider";
import { AnimatedTextArea } from "bik-inputs";
import { Button } from "bik-button";

type TUpdateStatus = {
  status: string;
  note: string;
};

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const { status, reload } = useDomainList();
  const { authInfo, chkLoginReq } = useAuth2();
  const { modalData, setMessage } = useTemplate();
  const [formData, setFormData] = useState<TUpdateStatus>({
    status: modalData?.status || "",
    note: "",
  });

  const updateStatus = (payload: any) => {
    setLoading(true);
    setMessage("Updating status...");
    ApiChangeStatus(authInfo, chkLoginReq, modalData.id, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateStatus(formData);
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
          options={
            status.map((item) =>
              addOption(item, capitalizeFirstLetter(item.toLowerCase()), item)
            ) || []
          }
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
          className="px-3 py-2    "
          type="submit"
          loading={loading}
        />
      </div>
    </form>
  );
};

const ModalChangeDomainStatus: FC<{}> = () => {
  const { closeModal, modalType, modalData } = useTemplate();

  return (
    <Dialog
      open={modalType === "domain-change-status"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
          <span className=" modal-subtitle">{modalData?.domainName}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalChangeDomainStatus;
