import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useDomainList } from "../context/DomainListProvider";
import { ApiUpdateTitle } from "../DomainListOperation";
import { AnimatedInputField } from "bik-inputs";
import { Button } from "bik-button";

type TProps = {
  closeModal: () => void;
};

const ModalContent: FC<TProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setMessage, modalData } = useTemplate();

  const [formData, setFormData] = useState<{
    title: string;
  }>({
    ...modalData,
  });

  const { authInfo, chkLoginReq } = useAuth2();
  const { reload } = useDomainList();

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setMessage("Updating Title...");
    setLoading(true);
    const payload = {
      ...formData,
    };
    ApiUpdateTitle(authInfo, chkLoginReq, modalData?.id || 0, payload)
      .then(({ message }) => {
        setMessage(message);
        closeModal();
        reload();
      })
      .catch((error: Error) => {
        setMessage(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      <AnimatedInputField
        label="Title"
        name="title"
        formData={formData}
        onChange={handleOnChange}
        className="mt-5"
        // placeholder="Enter Title"
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
          variant="secondary"
          className="w-24 h-10"
          loading={loading}
          onClick={handleSubmit}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalUpdateDomainTitle: FC = () => {
  const { modalType, closeModal, modalData } = useTemplate();
  return (
    <Dialog
      open={modalType === "domain-title-update"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update Domain Title</DialogTitle>{" "}
          <span className=" modal-subtitle">{modalData?.domainName}</span>
        </DialogHeader>
        <DialogBody className="!min-h-1">
          <ModalContent closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateDomainTitle;
