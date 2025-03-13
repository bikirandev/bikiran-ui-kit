import { FC } from "react";
import { TInvoiceInfo, TInvoiceProduct } from "@/bik-lib/types/invoice";
import capitalizeFirstLetter from "@/bik-lib/utils/capitalizeFirstLetter";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import editIcon from "./icon-edit.svg";
import deleteIcon from "./icon-delete.svg";
import Image from "next/image";
import { ApiInvoiceRemoveItem } from "@/bikiran/components/billing-invoice-manage/InvoiceManageOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useInvoiceInfo } from "@/bikiran/components/billing-invoice-manage/context/InvoiceManageProvider";

const HostingRow: FC<{
  index: number;
  data: TInvoiceProduct;
  editable: boolean;
  reload?: () => void;
  invoice: TInvoiceInfo;
}> = ({ index, data, invoice, editable, reload }) => {
  const unit = capitalizeFirstLetter(data?.unitName?.toLowerCase() || ""); //EX: month or year

  const { openModal, setConfirm, setMessage, setTemplateLoading } =
    useTemplate();
  const { authInfo, chkLoginReq } = useAuth2();

  const status = invoice?.status || "";
  const invoiceId = invoice?.id || 0;

  const deleteProduct = (productId: number) => {
    setConfirm({
      show: true,
      text: "Are you sure you want to remove this item ?",
      textCancel: "Cancel",
      textCancelCname: "bg-primary-300",
      txtAction: "Yes",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Removing...");
        ApiInvoiceRemoveItem(authInfo, chkLoginReq, invoiceId, productId)
          .then(({ message }) => {
            setMessage(message);
            setConfirm(null);
            if (reload) {
              reload();
            }
          })
          .catch((er: Error) => {
            setMessage(er.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  return (
    <tr className="[&>td]:border [&>td]:border-black [&>td]:px-2 [&>td]:py-2 relative group hover:!bg-[#8080802e]">
      <td className="border border-black px-2 py-1 text-center">{index + 1}</td>
      <td className="">
        <div className="space-y-1">
          <p className="text-primary text-base font-medium">{data.title}</p>
          {data.duration && (
            <p className="text-sm font-normal">
              {/* <span className="text-primary-700">Duration:</span> */}
              <span className="text-primary font-medium">
                {" "}
                {data.duration || 0}
              </span>
            </p>
          )}
        </div>
      </td>
      <td className=" text-center">
        <span className="font-medium">{(data.price || 0).toFixed(2)}</span>
        <br />/{unit}
      </td>
      <td className=" text-center">
        <span className="font-medium">{data.quantity || 0}</span> {unit}
      </td>
      <td className=" text-center font-medium">
        {(data.totalPrice || 0).toFixed(2)}
        {editable && status !== "ACTIVE" && (
          <div className="absolute top-1/2 -translate-y-1/2 left-[calc(100%_-_12px)] invisible group-hover:visible invoice-edit-btn ">
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="size-6 -mr-2 bg-error rounded-full p-1.5"
                onClick={() => openModal("update-invoice-product", data)}
              >
                <Image
                  src={editIcon}
                  alt="edit icon"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </button>
              <button
                type="button"
                className="size-6 -mr-2 bg-error rounded-full"
                onClick={() => deleteProduct(data.id)}
              >
                <Image
                  src={deleteIcon}
                  alt="edit icon"
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto rounded-full"
                />
              </button>
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default HostingRow;
