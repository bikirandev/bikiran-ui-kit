"use client";
import { FC } from "react";
import CPanelProvider, { useCPanel } from "./context/CPanelProvider";
import CPanelHeaderSection from "./CPanelHeaderSection";
import CPanelListTable from "./CPanelListTable";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const CPanelTableComp: FC<{}> = () => {
  const { data, loading } = useCPanel();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("CurrentPage")) || 1;
  const makeUrl = (num: number) => {
    const queries = new URLSearchParams(searchParams.toString());
    queries.set("CurrentPage", num.toString());
    return `${pathname}?${queries.toString()}`;
  };

  return (
    <section>
      <CPanelListTable data={data} />
      <Pagination
        data={data?.pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || data?.hostings?.length === 0}
      />
    </section>
  );
};
const CPanelPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <CPanelProvider query={query}>
      <section>
        <CPanelHeaderSection />
      </section>
      <CPanelTableComp />
    </CPanelProvider>
  );
};

export default CPanelPage;
