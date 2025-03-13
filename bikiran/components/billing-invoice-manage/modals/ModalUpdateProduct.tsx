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
import { ApiInvoiceUpdate } from "@/bikiran/components/billing-invoice-manage/InvoiceManageOperation";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { apiUpdateInvoiceUrl } from "@/bik-lib/utils/apiInvoiceUrl";
import dayjs from "dayjs";
import CommonPropertyComp from "@/bikiran/components/billing-invoice-manage/modals/ModalAddProduct/CommonPropertyComp";
import DynamicPropertyComp from "@/bikiran/components/billing-invoice-manage/modals/ModalAddProduct/DynamicPropertyComp";

const ModalContent: FC = () => {
  const { modalData, closeModal, setMessage } = useTemplate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({
    title: modalData?.title || "",
    contractPrice: modalData?.price || "",
    contractOfferPrice: modalData?.priceOffer || "",
    contractVatPercent: modalData?.vat || "",
    subscriptionStart: dayjs(modalData?.subscriptionStart * 1000).format(
      "YYYY-MM-DD"
    ),
    quantity: `${modalData?.quantity}` || "",
    domain: modalData?.domain || "",
    unitName: "YEAR",
  });

  const { authInfo, chkLoginReq } = useAuth2();
  const { invoice, reload } = useInvoiceInfo();

  const handleOnChange = (e: TInputChangeEvent) => {
    setFormData((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const payload = {
    title: formData?.title,
    subscriptionStart: formData?.subscriptionStart,
    quantity: Number(formData?.quantity) || 0,
    unitName: "YEAR",
    price: formData?.contractPrice,
    priceOffer: formData?.contractOfferPrice,
    vat: formData?.contractVatPercent,
    domain: formData?.domain,
    note: formData?.note,
    property: "",
  };
  const updateInvoice = () => {
    setLoading(true);
    ApiInvoiceUpdate(
      authInfo,
      chkLoginReq,
      apiUpdateInvoiceUrl(
        modalData.assetKey.toLowerCase(),
        invoice.id,
        modalData?.id
      ),
      payload
    )
      .then(({ message }) => {
        setMessage(message);
        reload();
        closeModal();
      })
      .catch((er: Error) => {
        setMessage(er.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="space-y-2">
      <div className="space-y-4 mt-3">
        <CommonPropertyComp
          formData={formData}
          handleOnChange={handleOnChange}
          modalData={modalData}
        />
        <div className="flex items-center gap-3 !mb-3">
          <span className="text-xl text-primary font-medium">Property</span>
          <hr className="w-full" />
        </div>
      </div>
      <DynamicPropertyComp
        product={modalData?.assetKey.toLowerCase()}
        formData={formData}
        handleOnChange={handleOnChange}
        modalData={modalData}
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
          className="px-3 h-10"
          loading={loading}
          onClick={() => updateInvoice()}
        >
          Update
        </Button>
      </div>
    </div>
  );
};

const ModalUpdateProduct = () => {
  const { closeModal, modalType, modalData } = useTemplate();
  return (
    <Dialog
      open={modalType === "update-invoice-product"}
      onOpenChange={closeModal}
    >
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            <div className="flex flex-col gap-2">
              <span>Update Product</span>
              <span className="text-primary-700 text-xs">
                {modalData?.title} ({modalData?.assetKey})
              </span>
            </div>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <ModalContent />
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
};

export default ModalUpdateProduct;
