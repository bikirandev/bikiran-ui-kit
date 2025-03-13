/* eslint-disable no-unused-vars */
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiCreateHostingUser } from "../HostingListOperation";
import { THostingCreatePayload } from "../hostingListType";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { addOption } from "@/bik-lib/utils/option";
import SetDateModalComp from "./SetDateModalComp";
import dayjs from "dayjs";
import { useHostingList } from "../context/HostingListProvider";
import { AnimatedInputField, InputField } from "bik-inputs";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import { Button } from "bik-button";

const ModalBody: FC<{
  setMessage: (message: string) => void;
  closeModal: () => void;
}> = ({ setMessage, closeModal }) => {
  const [formData, setFormData] = useState<any>({
    user: "",
    server: "",
    cpUsername: "",
    currency: "",
    packageId: 0,
    dateIssue: dayjs().format("YYYY-MM-DD"),
    dateExpire: dayjs().add(1, "month").format("YYYY-MM-DD"),
    rate: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const { authInfo } = useAuth2();
  const [userData, setUserData] = useState<any[]>([]);
  const { currencies, packageData, reload, cpServers } = useHostingList();
  const handleChange = (e: TInputChangeEvent | any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  useEffect(() => {
    if (formData.currency === "BDT") {
      setFormData({
        ...formData,
        rate: currencies?.find((item) => item.currency === "BDT")?.rate || 0,
      });
    } else if (formData.currency === "USD") {
      setFormData({
        ...formData,
        rate: 1,
      });
    }
  }, [formData.currency]);

  //Create Hosting user
  const addHostingUser = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    setMessage("Creating...");
    const payload: THostingCreatePayload = {
      userId: selectedUser?.id || 0,
      server: formData.server,
      cpUsername: formData.cpUsername,
      currency: formData.currency,
      dateIssue: formData.dateIssue,
      dateExpire: formData.dateExpire,
      packageId: formData.packageId,
      rate: formData.rate,
    };
    ApiCreateHostingUser(authInfo, payload)
      .then(({ message }) => {
        setMessage(message || "");
        closeModal();
        reload();
      })
      .catch((err) => {
        setMessage(err.message);
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={addHostingUser} className="flex flex-col gap-4 ">
      <UserSearchComp
        formData={formData}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        setFormData={setFormData}
        setUserData={setUserData}
        userData={userData}
      />
      <SelectField
        label=""
        name="packageId"
        placeholder="Select Package"
        options={
          packageData?.map((item) =>
            addOption(item.id, item.title, item.id.toString())
          ) || []
        }
        formData={formData}
        onChange={handleChange}
      />
      <div>
        <div className="flex gap-2 items-center">
          <SelectField
            label=""
            name="currency"
            placeholder="Select Currency"
            className="w-[227px]"
            options={
              currencies?.map(({ currency }) =>
                addOption(currency, currency, currency)
              ) || []
            }
            formData={formData}
            onChange={handleChange}
          />
          <InputField
            label=""
            placeholder="Current Rate"
            name="rate"
            formData={formData}
            onChange={handleChange}
            disabled={formData.currency === "USD"}
            className="w-[227px]"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <SelectField
          label=""
          name="server"
          placeholder="Select CpServer"
          className="w-[227px] -mt-1"
          options={cpServers.map((item) =>
            addOption(item.hostname, item.hostname, item.hostname)
          )}
          formData={formData}
          onChange={handleChange}
        />
        <AnimatedInputField
          label="Cp Username"
          name="cpUsername"
          formData={formData}
          onChange={handleChange}
        />
      </div>
      <SetDateModalComp formData={formData} handleOnChange={handleChange} />

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

const ModalAddHostingUser: FC = () => {
  const { closeModal, modalType, setMessage, modalData } = useTemplate();

  return (
    <Dialog open={modalType === "create-hosting"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="modal-container">
        <DialogHeader>
          <DialogTitle>Add Hosting</DialogTitle>
        </DialogHeader>
        <DialogBody className="!min-h-1 overflow-visible">
          <ModalBody closeModal={closeModal} setMessage={setMessage} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddHostingUser;
