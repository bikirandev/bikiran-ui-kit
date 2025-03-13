import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/bikiran/components/ui/dialog";
import { TFormEvent, TInputChangeEvent } from "@/bik-lib/types/event";
import { SelectField } from "@/bik-lib/lib/InputFields";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TInvoiceCreatePayload } from "../InvoiceListTypes";
import { ApiCreateInvoice } from "../InvoiceListOperation";
import { useInvoiceList } from "../context/InvoiceListProvider";
import { addOption } from "@/bik-lib/utils/option";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import { InputField } from "bik-inputs";
import { Button } from "bik-button";
import { useRouter } from "next/navigation";

const initialFormData: TInvoiceCreatePayload = {
  user: 0,
  currency: "",
  ratio: 0,
};

const ModalContent: FC = () => {
  const [formData, setFormData] =
    useState<TInvoiceCreatePayload>(initialFormData);
  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<TUser>();

  const { authInfo, chkLoginReq } = useAuth2();
  const { setMessage, closeModal } = useTemplate();
  const { currencies, reload } = useInvoiceList();

  const router = useRouter();

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCreateUser = (ev: TFormEvent) => {
    ev.preventDefault();
    setLoading(true);
    const payload = {
      user: selectedUser?.id || 0,
      currency: formData.currency,
      ratio: formData.ratio,
    };
    ApiCreateInvoice(authInfo, chkLoginReq, payload)
      .then(({ message, data }) => {
        router.push(`/billing/invoice/${data.invoiceId}/update`);
        setMessage(message);

        setTimeout(() => {
          closeModal();
        }, 100); // time: 100ms
        // reload();
      })
      .catch((err: Error) => {
        console.log(err.message);
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (formData.currency === "BDT") {
      setFormData({
        ...formData,
        ratio: currencies?.find((item) => item.currency === "BDT")?.rate || 0,
      });
    } else if (formData.currency === "USD") {
      setFormData({
        ...formData,
        ratio: 1,
      });
    }
  }, [formData.currency]);

  return (
    <form onSubmit={handleCreateUser}>
      <div className="space-y-3.5 mb-5">
        <UserSearchComp
          formData={formData}
          selectedUser={selectedUser}
          setFormData={setFormData}
          setSelectedUser={setSelectedUser}
          setUserData={setUserData}
          userData={userData}
        />
        <div className="flex justify-between items-center gap-3">
          <SelectField
            label=""
            name="currency"
            placeholder="Select Currency"
            className="w-56"
            options={
              currencies?.map(({ currency }) =>
                addOption(currency, currency, currency)
              ) || []
            }
            formData={formData}
            onChange={handleOnChange}
          />
          <InputField
            label=""
            placeholder="Current Rate"
            name="ratio"
            formData={formData}
            onChange={handleOnChange}
            disabled={formData.currency === "USD"}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2.5">
        <Button
          variant="gray"
          disabled={loading}
          onClick={closeModal}
          className="w-30 h-10"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="secondary"
          loading={loading}
          className="w-30 h-10"
        >
          Create
        </Button>
      </div>
    </form>
  );
};
const ModalCreateInvoice: FC = () => {
  const { modalType, closeModal } = useTemplate();
  return (
    <Dialog open={modalType === "create-invoice"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreateInvoice;
