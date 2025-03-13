"use client";
import React, { FC } from "react";
import {
  AccountAdmProvider,
  useAccountAdmContext,
} from "./context/AccountAdmProvider";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import AccountAdmHeaderSection from "./AccountAdmHeaderSection";
import AccountAdmTableSection from "./AccountAdmTableSection";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import ModalCredit from "./modal/ModalFund/ModalCredit";
import ModalDebit from "./modal/ModalFund/ModalDebit";

const AccountAdmTableComp: FC = () => {
  const { data, reFetching, pagination } = useAccountAdmContext();

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
      <AccountAdmTableSection data={data} />
      <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={reFetching || data?.length === 0}
      />
    </div>
  );
};
const AccountAdmPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo } = useAuth2();

  return (
    <AccountAdmProvider authInfo={authInfo} query={query}>
      <div className="admin-section">
        <AccountAdmHeaderSection />
        <AccountAdmTableComp />
      </div>
      {/* Modals */}
      <ModalCredit />
      <ModalDebit />
    </AccountAdmProvider>
  );
};

export default AccountAdmPage;
