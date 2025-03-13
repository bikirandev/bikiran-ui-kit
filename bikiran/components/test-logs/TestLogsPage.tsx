"use client";
import React, { FC } from "react";
import TestLogsProvider, { useTestLogs } from "./context/TestLogsProvider";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import TestLogsTable from "./TestLogsTable";
import TestLogsHeader from "./TestLogsHeader";

const TestLogsTableSection: FC = () => {
  const { loading, data, pagination } = useTestLogs();
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
      <TestLogsTable />

      <Pagination
        data={pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || data?.length === 0}
      />
    </div>
  );
};

const TestLogsPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <TestLogsProvider query={query}>
      <TestLogsHeader />
      <TestLogsTableSection />
    </TestLogsProvider>
  );
};

export default TestLogsPage;
