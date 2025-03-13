import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { addOption } from "@/bik-lib/utils/option";
import { TFormEvent } from "@/bik-lib/types/event";
import { useEnConfig } from "../context/EnConfigProvider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useState } from "react";
import { TVendorPayload } from "../enConfigTypes";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { InputField } from "bik-inputs";
import { Button } from "bik-button";
import { useApi } from "@/bik-lib/context/api/ApiProvider";
import catchAsync from "@/bik-lib/context/api/catchAsync";

const ModalContent: FC = () => {
  const { closeModal, modalData, setMessage } = useTemplate();

  const key = modalData?.key || "";
  const templateId = modalData?.vendor?.templateId || "";
  // const templateUrl = modalData?.vendor?.templateUrl || ""; //TODO: Need to change back later

  const [formData, setFormData] = useState<TVendorPayload>({
    name: "infobip", //TODO: Need to change back later
    templateId: templateId,
    templateUrl: "",
  });

  const { filters } = useEnConfig();
  const { put, reload, startLoading, loading } = useApi();

  const handleChange = (ev: any) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const payload = {
    name: "infobip", //TODO: Need to change back later
    templateId: formData.templateId,
    templateUrl: `https://portal.infobip.com/broadcast/template/${formData.templateId}`, //TODO: Need to change back later
  };

  const handleSubmit = catchAsync(async (ev: TFormEvent) => {
    ev.preventDefault();
    startLoading();
    setMessage("Updating vendor...");
    const { message } = await put(
      `/admin/notification/email/config/${key}/update-vendor`,
      payload
    );
    setMessage(message);
    closeModal();
    reload();
  });

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <SelectField
        label=""
        name="name"
        placeholder="Select Vendor"
        className="w-full"
        options={filters?.vendors?.map((i) => addOption(i, i, i)) || []}
        formData={formData}
        onChange={handleChange}
      />
      <InputField
        label="Template ID"
        name="templateId"
        formData={formData}
        onChange={handleChange}
        placeholder="Enter Template ID"
        // required
      />
      <InputField
        label="Template URL"
        name="templateUrl"
        formData={{
          templateUrl: payload?.templateUrl,
        }}
        onChange={handleChange}
        placeholder="Enter Template URL"
        disabled
        // required
      />

      <div className="flex items-center justify-end gap-2.5">
        <Button
          variant="gray"
          onClick={() => closeModal()}
          disabled={loading}
          className="w-28 h-9"
        >
          Cancel
        </Button>
        <Button
          variant="secondary"
          type="submit"
          loading={loading}
          className="w-28 h-9"
        >
          Save
        </Button>
      </div>
    </form>
  );
};

const ModalVendorUpdate = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog open={modalType === "vendor-update"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Update vendor</DialogTitle>
          <span className="modal-subtitle">{modalData?.key}</span>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalVendorUpdate;
