import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { Button } from "bik-button";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { AnimatedTextArea } from "bik-inputs";
import { useBankManagement } from "../context/BankManagementProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TUpdateAccountStPayload } from "../bankManagementTypes";
import { ApiUpdateBankStatus } from "../BankManagementOperation";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";

const ModalBody: FC = () => {
  const { modalData, setMessage, closeModal } = useTemplate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TUpdateAccountStPayload>({
    status: modalData?.status || "",
    note: "",
  });

  const { authInfo, chkLoginReq } = useAuth2();

  const { reload } = useBankManagement();

  const handleChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  const facId = modalData?.id || 0;

  const updateStatus = () => {
    setLoading(true);
    setMessage("Updating status...");
    ApiUpdateBankStatus(authInfo, chkLoginReq, facId, formData)
      .then(({ message }) => {
        setMessage(message);
        reload();
        closeModal();
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col gap-4 mt-3">
      <SelectField
        label=""
        placeholder="Select Currency"
        name="status"
        formData={formData}
        onChange={handleChange}
        options={["Active", "Inactive"].map((c) =>
          addOption(c, c, c.toLowerCase())
        )}
      />

      <AnimatedTextArea
        formData={formData}
        name="note"
        label="Note"
        className="h-[115px] "
        onChange={handleChange}
      />

      <div className="w-full flex justify-end items-center gap-2 mb-2">
        <Button
          variant="gray"
          title="Cancel"
          className="w-[100px] h-10"
          disabled={loading}
          onClick={closeModal}
        />
        <Button
          variant="secondary"
          title="Save"
          loading={loading}
          onClick={updateStatus}
          className="px-3 py-2"
        />
      </div>
    </div>
  );
};

const ModalUpdateBankStatus: FC = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog open={modalType === "update-bank-status"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1 ">
          <ModalBody />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateBankStatus;
