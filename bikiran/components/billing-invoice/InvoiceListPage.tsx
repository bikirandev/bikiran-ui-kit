"use client";
import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import InvoiceTableSection from "./InvoiceTableSection";
import InvoiceListHeaderSection from "./InvoiceListHeaderSection";
import InvoiceListProvider, {
  useInvoiceList,
} from "./context/InvoiceListProvider";
import InvoiceSidebarSection from "./InvoiceSidebarSection";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { CustomSidebar, Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const InvoiceListTableComp: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage")) || 1;
  const makeUrl = (num: number) => {
    const queries = new URLSearchParams(searchParams.toString());
    queries.set("CurrentPage", num.toString());
    return `${pathname}?${queries.toString()}`;
  };

  const { invoices, loading, pagination } = useInvoiceList();
  return (
    <div>
      <InvoiceTableSection invoices={invoices} />
      <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || invoices?.length === 0}
      />
    </div>
  );
};

const InvoiceListPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo, chkLoginReq } = useAuth2();

  const { modalData } = useTemplate();

  return (
    <InvoiceListProvider
      authInfo={authInfo}
      chkLoginReq={chkLoginReq}
      query={query}
    >
      <div className="admin-section">
        <InvoiceListHeaderSection />
        <InvoiceListTableComp />
      </div>

      <CustomSidebar usePathname={usePathname} useTemplate={useTemplate}>
        <InvoiceSidebarSection data={modalData} />
      </CustomSidebar>
    </InvoiceListProvider>
  );
};

export default InvoiceListPage;
