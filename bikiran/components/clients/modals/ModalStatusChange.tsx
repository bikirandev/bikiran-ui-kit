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
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { addOption } from "@/bik-lib/utils/option";
import { AnimatedTextArea } from "bik-inputs";
import { Button } from "bik-button";
import { ApiClientStatusUpdate } from "../ClientInfoOperations";
import { useClientInfo } from "../context/ClientInfoProvider";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { authInfo, chkLoginReq } = useAuth2();
  const { modalData, setMessage } = useTemplate();
  const [formData, setFormData] = useState<any>({
    status: modalData?.status,
    note: "",
  });
  const { reFetch, status } = useClientInfo();

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const updateUserPhone = (payload: any) => {
    setLoading(true);
    setMessage("Updating...");
    ApiClientStatusUpdate(
      authInfo,
      modalData?.id || 0,
      formData.status,
      formData.note
    )
      .then(({ message }) => {
        setMessage(message);
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
    updateUserPhone(formData);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="flex flex-col gap-4 mt-3"
    >
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
              addOption(item, capitalizeFirstLetter(item), item)
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

const ModalStatusChange: FC = () => {
  const { closeModal, modalType } = useTemplate();

  return (
    <Dialog open={modalType === "update-status"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalStatusChange;
