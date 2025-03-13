"use client";
import TransactionProvider, {
  useTransaction,
} from "./context/TransactionProvider";
import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { Pagination } from "bik-utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import TransactionTableSection from "./TransactionTableSection";
import TransactionHeaderSection from "./TransactionHeaderSection";

const TransactionTableComp: FC = () => {
  const { transaction, reFetching, pagination } = useTransaction();

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage")) || 1;
  const makeUrl = (num: number) => {
    const queries = new URLSearchParams(searchParams.toString());
    queries.set("CurrentPage", num.toString());
    return `${pathname}?${queries.toString()}`;
  };

  return (
    <div>
      <TransactionTableSection />
      <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={reFetching || transaction?.length === 0}
      />
    </div>
  );
};
const TransactionPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo } = useAuth2();
  return (
    <TransactionProvider authInfo={authInfo} query={query}>
      <div className="admin-section">
        <TransactionHeaderSection />
        <TransactionTableComp />
      </div>
    </TransactionProvider>
  );
};

export default TransactionPage;
