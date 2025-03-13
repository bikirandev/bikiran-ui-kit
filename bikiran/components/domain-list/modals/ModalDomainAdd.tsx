import { FC, useState, useCallback, useEffect, useRef } from "react";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { TAddDomainPayload } from "../domainListTypes";
import SetCurrencyModalComp from "./UserSetCurrencyModalComp";
import SetDateModalComp from "./SetDateModalComp";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { ApiAddDomain, ApiSearchDomain } from "../DomainListOperation";
import DomainSelectSectionModalComp from "./DomainSelectSectionModalComp";
import dayjs from "dayjs";
import { TUser } from "@/bikiran/shared/user-search/UserSearchType";
import { useDomainList } from "../context/DomainListProvider";
import PriceCalculationComp from "@/bikiran/shared/price-calculation-comp/PriceCalculationComp";
import UserSearchComp from "@/bikiran/shared/user-search/UserSearchComp";
import { AnimatedTextArea } from "bik-inputs";
import { Button } from "bik-button";

type TProps = {
  closeModal: () => void;
};

const ModalContent: FC<TProps> = ({ closeModal }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TAddDomainPayload>(
    {} as TAddDomainPayload
  );
  const [domainLoading, setDomainLoading] = useState<boolean | undefined>(
    undefined
  );
  const [selectedUser, setSelectedUser] = useState<TUser>();
  const [errorMassage, setErrorMassage] = useState<string>("");
  const [userData, setUserData] = useState<any[]>([]);

  const { authInfo, chkLoginReq } = useAuth2();
  const { setMessage } = useTemplate();
  const { reload } = useDomainList();

  const formDataRef = useRef(formData);

  const debouncedSearchDomain = useCallback(
    (value: string, updatedFormData: TAddDomainPayload) => {
      setDomainLoading(true);
      ApiSearchDomain(
        authInfo,
        chkLoginReq,
        value,
        updatedFormData.contractCurrency,
        updatedFormData.contractCurrencyRate.toString()
      )
        .then(({ data }) => {
          if (data) {
            setErrorMassage("");
            setFormData((prev) => ({
              ...prev,
              title: data.title,
              subscriptionStart: dayjs(data.timeRegister * 1000).format(
                "YYYY-MM-DD"
              ),
              subscriptionEnd: dayjs(data.timeExpire * 1000).format(
                "YYYY-MM-DD"
              ),
              contractPrice: data.price,
              contractOfferPrice: data.priceOffer,
              vat: data.vat,
            }));
          }
        })
        .catch((err: Error) => {
          setErrorMassage(err.message);
        })
        .finally(() => {
          setDomainLoading(false);
        });
    },
    [authInfo, chkLoginReq]
  );

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    if (formData.domainName && formData.contractCurrencyRate) {
      const handler = setTimeout(() => {
        debouncedSearchDomain(formData.domainName, formDataRef.current);
      }, 500);

      return () => clearTimeout(handler);
    }
  }, [
    formData.domainName,
    formData.contractCurrencyRate,
    debouncedSearchDomain,
  ]);

  const handleOnChange = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "domainName" ? value.replace(/\s/g, "") : value,
    }));
  };

  const handleSubmit = () => {
    setMessage("Adding domain...");
    setLoading(true);
    const payload = {
      userId: selectedUser?.id,
      ...formData,
      domainName: formData?.domainName?.trim(),
    };
    ApiAddDomain(authInfo, chkLoginReq, payload)
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
    <div className="">
      <div className="mb-4 space-y-4">
        <UserSearchComp
          formData={formData}
          selectedUser={selectedUser}
          setFormData={setFormData}
          setSelectedUser={setSelectedUser}
          userData={userData}
          setUserData={setUserData}
        />
        <SetCurrencyModalComp
          formData={formData}
          setFormData={setFormData}
          handleOnChange={handleOnChange}
        />
        <DomainSelectSectionModalComp
          formData={formData}
          handleOnChange={handleOnChange}
          domainLoading={domainLoading}
          errorMassage={errorMassage}
        />
        <SetDateModalComp
          formData={formData}
          handleOnChange={handleOnChange}
          key={formData.subscriptionStart}
        />
        <PriceCalculationComp
          formData={formData}
          handleOnChange={handleOnChange}
          price={true}
          offer={true}
          vat={true}
        />
        <AnimatedTextArea
          label="Note"
          name="note"
          className="h-24"
          formData={formData}
          onChange={handleOnChange}
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
        >
          Add
        </Button>
      </div>
    </div>
  );
};

const ModalDomainAdd: FC = () => {
  const { modalType, closeModal } = useTemplate();
  return (
    <Dialog open={modalType === "domain-add"} onOpenChange={closeModal}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Add Domain</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent closeModal={closeModal} />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDomainAdd;
