"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { Button } from "bik-button";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { useInvoiceInfo } from "@/bikiran/components/billing-invoice-manage/context/InvoiceManageProvider";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { ApiUpdateInvoiceNote } from "@/bikiran/components/billing-invoice-manage/InvoiceManageOperation";
import { AnimatedInputField, AnimatedTextArea } from "bik-inputs";

type TAddNotePayload = {
  noteTitle: string;
  noteDescription: string;
};

const ModalContent: FC = () => {
  const { setMessage, closeModal, modalData } = useTemplate();

  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TAddNotePayload>({
    noteTitle: modalData?.noteTitle,
    noteDescription: modalData?.noteDescription,
  });

  const { authInfo, chkLoginReq } = useAuth2();

  const { invoice, reload } = useInvoiceInfo();

  const handleOnChange = (e: TInputChangeEvent) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = (ev: TFormEvent) => {
    ev.preventDefault();

    setLoading(true);
    setMessage("Updating note...");

    ApiUpdateInvoiceNote(authInfo, chkLoginReq, invoice?.id, formData)
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

  return (
    <form onSubmit={handleSave} className="space-y-4 mt-2">
      <AnimatedInputField
        formData={formData}
        label="Title"
        name="noteTitle"
        onChange={handleOnChange}
      />

      {/* TODO : Add ckEditor here */}
      <AnimatedTextArea
        formData={formData}
        label="Note"
        name="noteDescription"
        className="h-36"
        onChange={handleOnChange}
      />

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          disabled={loading}
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          className="w-24 h-10"
          loading={loading}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

const ModalAddNote = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "add-note"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddNote;
