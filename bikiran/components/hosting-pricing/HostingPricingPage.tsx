"use client";

import React, { FC, useState } from "react";
import HostingPricingProvider, {
  useHosting,
} from "./context/HostingPricingProvider";
import HostingPricingHeaderSection from "./HostingPricingHeaderSection";
import HostingTableSection from "./HostingTableSection";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const HOstingPricingTableComp: FC = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage")) || 1;
  const makeUrl = (num: number) => {
    const queries = new URLSearchParams(searchParams.toString());
    queries.set("CurrentPage", num.toString());
    return `${pathname}?${queries.toString()}`;
  };

  const { hostingPriceData, loading } = useHosting();
  return (
    <div>
      <HostingTableSection hostingPriceData={hostingPriceData} />
      <Pagination
        data={hostingPriceData?.pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || hostingPriceData?.hostingPackages?.length === 0}
      />
    </div>
  );
};
const HostingPricingPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo } = useAuth2();

  return (
    <HostingPricingProvider authInfo={authInfo} query={query}>
      <div className="admin-section">
        <HostingPricingHeaderSection />
        <HOstingPricingTableComp />
      </div>
    </HostingPricingProvider>
  );
};

export default HostingPricingPage;
