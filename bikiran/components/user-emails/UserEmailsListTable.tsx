"use client";
import { FC } from "react";
import { useUserEmailsList } from "./context/UserEmailsListProvider";
import UserEmailsListWeb from "./layout/UserEmailsListWeb";
import { Pagination } from "bik-utils";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

const UserEmailsListTable: FC = () => {
  const { loading, userEmailsData } = useUserEmailsList();
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
      <UserEmailsListWeb data={userEmailsData} />
      <Pagination
        data={userEmailsData?.pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || userEmailsData?.contacts?.length === 0}
      />
    </div>
  );
};

export default UserEmailsListTable;
