import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { FC, useRef, useState } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import Image from "next/image";
import { icons } from "@/bikiran/lib/icons";
import { LoadingComp } from "bik-utils";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { usePaymentMethod } from "../context/PaymentMethodProvider";
import { ApiUpdatePaymentIcon, ApiUploadLogo } from "../PaymentMethodOperation";
import { Button } from "bik-button";
import iconCameraFill from "@/public/assets/images/icons/icon-camera-fill.svg";

type TProps = {
  modalData: any;
  setMessage: (message: string) => void;
  closeModal: () => void;
};
const ModalContent: FC<TProps> = ({ closeModal, modalData, setMessage }) => {
  const [formData, setFormData] = useState<any>({
    icon: modalData?.icon || "",
  });
  const [iconUrl, setIconUrl] = useState<string>(modalData?.icon || "");
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const { authInfo } = useAuth2();
  const { reload } = usePaymentMethod();

  // upload image
  const handleUploadLogo = (e: any) => {
    setIsDisable(true);
    const file = e.target.files![0];
    if (file) {
      const fileData = new FormData();
      fileData.append("file", file); // Ensure the correct field name
      setLoading(true);
      ApiUploadLogo(authInfo, fileData)
        .then(({ data }) => {
          setLoading(false);
          setFormData((prev: any) => ({
            ...prev,
            icon: URL.createObjectURL(file),
          }));
          setIconUrl(data.publicUrl);
          reload();
          setIsDisable(false);
        })
        .catch((ex: Error) => {
          setLoading(false);
          setMessage(ex.message);
          e.target.value = ""; // Clear input on failure
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleUploadPaymentIcon = () => {
    if (iconUrl) {
      setLoading(true);
      ApiUpdatePaymentIcon(authInfo, modalData.id, iconUrl)
        .then(() => {
          setMessage("Icon updated successfully");
          closeModal();
          reload();
        })
        .catch((ex: Error) => {
          setMessage(ex.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="text-center relative space-y-4">
      {/* Circular Profile Image */}
      <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border border-primary-700 relative group">
        <Image
          src={formData.icon || icons.iconDefaultApp}
          alt="avatar"
          width={160}
          height={160}
          priority
          className="size-full object-cover"
        />
        <button
          type="button"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-0 w-full h-16 p-1 flex justify-center items-center group-hover:bg-opacity-50"
          onClick={handleFileInputClick}
        >
          <Image
            src={iconCameraFill}
            alt="camera"
            width={0}
            height={0}
            sizes="100vw"
            className="size-10 opacity-0 group-hover:opacity-100 transition-all cursor-pointer"
          />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleUploadLogo}
          hidden
          accept="image/png, image/jpeg, image/jpg"
        />
      </div>
      <div>{loading && <LoadingComp />}</div>
      <div>
        <Button
          variant="secondary"
          className="w-28 py-2"
          onClick={handleUploadPaymentIcon}
          disabled={isDisable || loading}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

const ModalChangeIcon: FC = () => {
  const { modalType, closeModal, modalData, setMessage } = useTemplate();
  return (
    <Dialog
      open={modalType === "update-payment-icon"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader className="border-0">
          <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-40">
          <ModalContent
            modalData={modalData}
            setMessage={setMessage}
            closeModal={closeModal}
          />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalChangeIcon;
