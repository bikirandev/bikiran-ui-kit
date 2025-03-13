"use client";
import { Button } from "bik-button";
import { FC, useRef } from "react";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ButtonRefresh } from "@/bik-lib/lib/button";
import { useInvoiceInfo } from "./context/InvoiceManageProvider";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import { useParams, useRouter } from "next/navigation";

const InvoiceSearchField: FC = () => {
  const ref = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const { id } = useParams();

  const handleBlur = (ev: TInputChangeEvent) => {
    const { name, value } = ev.target;
    if (name && value?.length > 0) {
      router.push(`/billing/invoice/${value}/update`);
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      name="invoiceId"
      onChange={() => {}}
      onBlur={handleBlur}
      placeholder={typeof id === "string" ? id : "Type Invoice ID..."}
      className="border border-primary-300 rounded-10 h-10 focus:outline-none px-4 placeholder:text-sm focus:border-secondary"
    />
  );
};

const InvoiceManageHeaderComp: FC = () => {
  const { reload, loading, invoiceInfo } = useInvoiceInfo();

  const { openModal } = useTemplate();

  return (
    <section className="flex flex-wrap items-center justify-between gap-2.5 mb-7.5 print:hidden">
      <div className="flex items-center gap-2.5">
        <h2 className="text-primary text-2xl font-medium  whitespace-nowrap">
          Update Invoice:
        </h2>
        <InvoiceSearchField />
      </div>

      <div className="flex items-center gap-2">
        <ButtonRefresh
          className="size-10"
          onClick={() => reload()}
          disabled={loading || invoiceInfo?.invoice?.id === 0}
        />
        <Button
          type="button"
          variant="blue"
          className="px-4 h-10"
          onClick={() => openModal("duplicate-product")}
          disabled={loading || invoiceInfo?.invoice?.id === 0}
        >
          Duplicate
        </Button>
        <Button
          variant="secondary"
          className="px-4 h-10"
          onClick={() => {
            if (typeof window !== "undefined") {
              window.print();
            }
          }}
          disabled={loading || invoiceInfo?.invoice?.id === 0}
        >
          Print Invoice
        </Button>
      </div>
    </section>
  );
};

export default InvoiceManageHeaderComp;
