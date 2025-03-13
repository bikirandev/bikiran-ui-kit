"use client";
import { FC } from "react";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import DomainTableSection from "./DomainTableSection";
import DomainPricingProvider, {
  useDomain,
} from "./context/DomainPricingProvider";
import DomainPricingHeaderSection from "./DomainPricingHeaderSection";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const DomainPricingTableComp: FC = () => {
  const { data, loading } = useDomain();
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
      <DomainTableSection data={data} />
      <Pagination
        data={data?.pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || data?.domainPackages?.length === 0}
      />
    </div>
  );
};
const DomainPricingPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  const { authInfo } = useAuth2();

  return (
    <DomainPricingProvider authInfo={authInfo} query={query}>
      <DomainPricingHeaderSection />
      <DomainPricingTableComp />
    </DomainPricingProvider>
  );
};

export default DomainPricingPage;
