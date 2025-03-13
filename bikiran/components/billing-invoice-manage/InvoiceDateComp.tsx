import { cn } from "@/bik-lib/utils/cn";
import { Button } from "bik-button";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { InputDate } from "@/bik-lib/lib/InputFields";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiUpdateDate } from "./InvoiceManageOperation";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import SectionLoadingComp from "./SectionLoadingComp";

type TInvoiceInfoPayload = {
  invoiceId: number;
  dateOfIssue: string;
  dueDate: string;
};

const InvoiceDateComp = () => {
  const { invoice: data, reload, loading } = useInvoiceInfo();

  const [updating, setUpdating] = useState<boolean>(false);
  const [formData, setFormData] = useState<TInvoiceInfoPayload>({
    invoiceId: data?.id,
    dateOfIssue: "",
    dueDate: "",
  });

  const { authInfo, chkLoginReq } = useAuth2();
  const { setMessage } = useTemplate();

  const invoice = data?.id?.toString();

  const handleOnChange = (e: TInputChangeEvent) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const resetDate = () => {
    setFormData((prev) => ({
      ...prev,
      dateOfIssue: dayjs(data?.timeIssue * 1000).format("YYYY-MM-DD"),
      dueDate: dayjs(data?.timeDue * 1000).format("YYYY-MM-DD"),
    }));
  };

  useEffect(() => {
    if (data?.timeIssue && data?.timeDue) {
      setFormData((prev) => ({
        ...prev,
        invoiceId: data.id || 0,
        dateOfIssue: dayjs(data.timeIssue * 1000).format("YYYY-MM-DD"),
        dueDate: dayjs(data.timeDue * 1000).format("YYYY-MM-DD"),
      }));
    }
  }, [data]);

  const payload = {
    dateIssue: formData.dateOfIssue,
    dateDue: formData.dueDate,
  };

  const handleSave = () => {
    setUpdating(true);
    ApiUpdateDate(authInfo, chkLoginReq, invoice, payload)
      .then(({ message }) => {
        setMessage(message);
        reload(-4);
      })
      .catch((err: Error) => {
        setMessage(err.message);
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const isUpdatable = () => {
    if (
      formData?.dateOfIssue ===
        dayjs(data?.timeIssue * 1000).format("YYYY-MM-DD") &&
      formData?.dueDate === dayjs(data?.timeDue * 1000).format("YYYY-MM-DD")
    ) {
      return false;
    } else if (formData?.dateOfIssue !== "" && formData?.dueDate !== "") {
      return true;
    }
  };

  return (
    <div className="invoice-action-cont relative">
      {/* Loading while updating */}
      {updating && <SectionLoadingComp />}

      <div className="space-y-2">
        <h2 className="text-primary text-xl font-medium mb-4">Invoice Date</h2>
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="text-primary-700 font-medium flex items-center">
              Issue Date
            </div>
            <InputDate
              name="dateOfIssue"
              className="h-10"
              formData={formData}
              onChange={handleOnChange}
              disabled={loading}
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-primary-700 font-medium flex items-center">
              Due Date
            </div>
            <InputDate
              name="dueDate"
              className="h-10"
              formData={formData}
              onChange={handleOnChange}
              disabled={loading}
            />
          </div>
        </div>

        <div
          className={cn(
            "flex justify-end gap-2 max-h-0 overflow-hidden transition-all",
            {
              "max-h-8": isUpdatable(),
            }
          )}
        >
          <Button
            type="reset"
            className="w-20 h-8 flex justify-center items-center text-sm py-2"
            variant="gray"
            onClick={resetDate}
          >
            Reset
          </Button>
          <Button
            className="w-20 h-8 flex justify-center items-center text-sm py-2"
            variant="secondary"
            loading={updating}
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceDateComp;
