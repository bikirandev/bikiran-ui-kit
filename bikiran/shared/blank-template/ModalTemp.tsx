import React, { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { Button } from "bik-button";
type TProps = {
  closeModal: () => void;
};

const ModalContent: FC<TProps> = ({ closeModal }) => {
  // const [loading, setLoading] = useState<boolean>(false)

  const yourHandlerName = () => {};

  return (
    <div>
      {/* Your Modal Content Goes here */}

      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          className="w-24 h-10"
          // disabled={loading} // if you have loading state
          onClick={closeModal}
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          className="w-24 h-10"
          // loading={loading} // if you have loading state
          onClick={yourHandlerName}
        >
          {/* your action button name  */}
        </Button>
      </div>
    </div>
  );
};

const ModalTemp = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "your-modal-name"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Your Title Goes here</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalTemp;
