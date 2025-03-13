import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "bik-button";
import { useApi } from "@/bik-lib/context/api/ApiProvider";
import { TFormEvent } from "@/bik-lib/types/event";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useUserList } from "../context/UserListProvider";
import { FC, useState } from "react";
import { AnimatedTextArea } from "bik-inputs";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import catchAsync from "@/bik-lib/context/api/catchAsync";

const ModalBody: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const { modalData, setMessage } = useTemplate();
  const [formData, setFormData] = useState<any>({
    userId: modalData?.id || 0,
    status: modalData?.status || "",
    note: modalData?.note || "",
  });
  const { userListData, reload } = useUserList();

  const userId = modalData?.id || 0;
  const { post, startLoading, loading } = useApi();

  const updateStatus = catchAsync(async (payload: any) => {
    startLoading();
    setMessage("Updating...");

    const { message } = await post(
      `/admin/user/${userId}/update-status`,
      payload
    );
    closeModal();
    setMessage(message);
    reload();
  });

  const handleSubmit = (ev: TFormEvent) => {
    ev.preventDefault();
    updateStatus(formData);
  };
  const handleStatusChange = (value: string) => {
    setFormData((prev: any) => ({ ...prev, status: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-3">
      <div className="w-full flex justify-between items-center">
        <span className=" font-medium text-base text-primary">Status</span>
        <Select value={formData.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-1/2 focus:ring-0 focus:ring-offset-0 h-[45px] text-sm font-medium text-primary-700">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent className="text-sm font-medium text-primary-700">
            {userListData.status.map((option: any) => (
              <SelectItem key={option} value={option}>
                {capitalizeFirstLetter(option)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AnimatedTextArea
        formData={formData}
        name="note"
        label="Note"
        className="h-[115px] "
        onChange={(e) => setFormData({ ...formData, note: e.target.value })}
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
          className="px-3 py-2"
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
    <Dialog open={modalType === "status-Update"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1 ">
          <ModalBody closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalStatusChange;
