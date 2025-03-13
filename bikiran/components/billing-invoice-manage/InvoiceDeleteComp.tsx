import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useRouter } from "next/navigation";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { ApiDeleteInvoice } from "./InvoiceManageOperation";

const InvoiceDeleteComp: FC<{ invoiceId: number }> = ({ invoiceId }) => {
  const { authInfo, chkLoginReq } = useAuth2();
  const { invoice, invoiceInfo } = useInvoiceInfo();
  const { setConfirm, setTemplateLoading, setMessage } = useTemplate();

  const router = useRouter();

  const deleteInvoice = () => {
    setConfirm({
      show: true,
      text: "Are you sure, you want to delete all existing products to delete this invoice?",
      textAction: "Yes",
      textActionCname: "bg-red-600",
      textCancel: "Cancel",
      textCancelCname: "bg-primary-100 text-primary-500",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Deleting invoice...");
        ApiDeleteInvoice(authInfo, chkLoginReq, invoiceId?.toString())
          .then(({ message }) => {
            setMessage(message);
            setTimeout(() => {
              setConfirm(null);
            }, 100); // time: 100ms
            // reload();
            router.push("/billing/invoice");
          })
          .catch((err: Error) => {
            setMessage(err.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  const checkAvailable =
    invoice?.totalPaid === 0 && invoiceInfo?.items?.length === 0;

  return (
    <div className="invoice-action-cont bg-red-100 border border-red-300 p-4 rounded-lg shadow-md">
      <h3 className="text-red-500 text-xl font-medium">Delete Invoice</h3>
      <p className="text-red-500 mt-2">
        Invoice can only be deleted if the paid amount is zero and no products
        are added.
      </p>

      <div className="flex gap-4 mt-4">
        <button
          className={`px-4 py-2 rounded-lg transition ${
            checkAvailable
              ? "bg-red-500 text-white hover:bg-red-700"
              : "bg-red-300 text-red-700 cursor-not-allowed"
          }`}
          disabled={!checkAvailable}
          onClick={() => deleteInvoice()}
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
};

export default InvoiceDeleteComp;
