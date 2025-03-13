import React, { FC, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
} from "@/bikiran/components/ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { AnimatedTextArea } from "bik-inputs";
import { Button } from "bik-button";
import UserInformationColumn from "./UserInformationColumnComp";
import { TDebitCredit } from "@/bikiran/components/billing/accountAdm/AccountAdmTypes";

import {
  ApiCreateCreditNote,
  ApiGetCreditNoteInfo,
} from "@/bikiran/components/billing/accountAdm/AccountAdmOperation";
import { useAccountAdmContext } from "../../context/AccountAdmProvider";

const initialValue: TDebitCredit = {
  user: {
    id: 0,
    displayName: "",
    email: "",
    phone: "",
    photoUrl: "",
    status: "",
    userProfile: "",
    primaryIds: [],
    primaryProjectId: 0,
  },
  fac: {
    facId: 0,
    facType: "",
    credit: 0,
    debit: 0,
    balance: 0,
    currency: "",
  },
};

const ModalContent: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [userFetching, setUserFetching] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    amount: number;
    note: string;
  }>({
    amount: 0,
    note: "",
  });
  const [data, setData] = useState<{
    creditSide: TDebitCredit;
    debitSide: TDebitCredit;
  }>({
    creditSide: initialValue,
    debitSide: initialValue,
  });

  const { authInfo } = useAuth2();
  const { reFetch } = useAccountAdmContext();
  const { closeModal, modalData, setMessage } = useTemplate();

  useEffect(() => {
    setUserFetching(true);
    ApiGetCreditNoteInfo(authInfo, modalData?.id)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setUserFetching(false);
      });
  }, []);

  const creditSide = data.creditSide;
  const debitSide = data.debitSide;

  const handleOnChange = (e: TInputChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const operatorNewBalance =
    Number(debitSide.fac.balance) - Number(formData.amount);
  const userNewBalance =
    Number(creditSide.fac.balance) + Number(formData.amount);

  const handleSubmit = () => {
    const payload = {
      debitAccountId: debitSide.fac.facId,
      amount: formData.amount,
      note: formData.note,
    };
    setLoading(true);
    ApiCreateCreditNote(authInfo, creditSide.fac.facId, payload)
      .then(({ message }) => {
        closeModal();
        if (message) {
          setMessage(message);
        }
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4">
      <div className="flex item-center gap-[6px]">
        <UserInformationColumn
          type="debit"
          data={debitSide}
          newBalance={operatorNewBalance}
          loading={userFetching}
          formData={formData}
          onChange={handleOnChange}
          className="pr-3"
        />

        <div className="h-auto w-1 bg-primary-100"> </div>
        <UserInformationColumn
          type="credit"
          data={creditSide}
          newBalance={userNewBalance}
          loading={userFetching}
          formData={formData}
          onChange={handleOnChange}
          className="pl-3"
        />
      </div>
      <div className="w-full flex justify-start gap-[76px]">
        <div className="text-primary-700 text-sm font-medium">
          Note<span className="text-error">*</span>
        </div>
        <AnimatedTextArea
          formData={formData}
          label="Please Write a Reason"
          name="note"
          onChange={handleOnChange}
          className="!h-18 !w-[491px]"
        />
      </div>
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
          disabled={userFetching}
        >
          Transfer
        </Button>
      </div>
    </div>
  );
};

const ModalCredit = () => {
  const { closeModal, modalType } = useTemplate();
  return (
    <Dialog open={modalType === "credit-note"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined} className="!max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Credit Note</DialogTitle>
        </DialogHeader>
        <DialogBody className="w-auto  min-h-1">
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCredit;
