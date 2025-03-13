"use client";

import React, { FC } from "react";
import UserActivityProvider, {
  useActivityUser,
} from "./context/UserActivityProvider";
import UserActivityLogsTable from "./UserActivityLogsTable";
import UserActivityLogsHeader from "./UserActivityLogsHeader";
import { Pagination } from "bik-utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const UserActivityLogsTableSection: FC = () => {
  const { loading, data, pagination } = useActivityUser();
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
      <UserActivityLogsTable />

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
const UserActivityLogsPage: FC<{ query: Record<string, any> }> = ({
  query,
}) => {
  return (
    <UserActivityProvider query={query}>
      <UserActivityLogsHeader />
      <UserActivityLogsTableSection />
    </UserActivityProvider>
  );
};

export default UserActivityLogsPage;
