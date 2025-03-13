"use client";

import React, { FC, use, useState } from "react";
import GatewayTransactionProvider, {
  useGatewayTransaction,
} from "./context/GetwayTransactionProvider";
import GatewayTransactionHeaderSection from "./GatewayTransactionHeaderSection";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import GatewayTransactionTableSection from "./GatewayTransactionTableSection";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const GatewayTransactionTableComp: FC = () => {
  const { gatewayTransaction, reFetching, pagination } =
    useGatewayTransaction();

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
      <GatewayTransactionTableSection gatewayTransaction={gatewayTransaction} />
      <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={reFetching || !gatewayTransaction}
      />
    </div>
  );
};
const GatewayTransactionPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo } = useAuth2();

  return (
    <GatewayTransactionProvider authInfo={authInfo} query={query}>
      <div className="admin-section">
        <GatewayTransactionHeaderSection />
        <GatewayTransactionTableComp />
      </div>
    </GatewayTransactionProvider>
  );
};

export default GatewayTransactionPage;
