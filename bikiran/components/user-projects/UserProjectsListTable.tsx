"use client";
import { FC } from "react";
import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
import Link from "next/link";
import { useUserProjectsList } from "./context/UserProjectsListProvider";
import UserProjectsListWeb from "./layout/UserProjectsListWeb";
import { Pagination } from "bik-utils";
import { usePathname, useSearchParams } from "next/navigation";

const UserProjectsListTable: FC = () => {
  const { userProjectsData, loading } = useUserProjectsList();
  const { windowWidth } = useLayout();
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
      {/* {windowWidth > SIZE_MD ? (
        <UserEmailsListWeb data={userEmailsData} />
      ) : (
        <UserListMobile data={userEmailsData} />
      )} */}
      <UserProjectsListWeb data={userProjectsData} />
      <Pagination
        data={userProjectsData.pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || userProjectsData?.projects.length === 0}
      />
    </div>
  );
};

export default UserProjectsListTable;
