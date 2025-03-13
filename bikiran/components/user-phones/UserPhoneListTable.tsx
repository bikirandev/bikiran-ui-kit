"use client";
import { FC } from "react";
import { SIZE_MD, useLayout } from "@/bik-lib/context/LayoutProvider";
import Link from "next/link";
import { useUserPhonesList } from "./context/UserPhonesListProvider";
import UserPhonesListWeb from "./layout/UserPhonesListWeb";
import { usePathname, useSearchParams } from "next/navigation";
import { Pagination } from "bik-utils";

const UserPhonesListTable: FC = () => {
  const { loading, userPhonesData } = useUserPhonesList();
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
      <UserPhonesListWeb data={userPhonesData} />

      <Pagination
        data={userPhonesData.pagination}
        link={Link}
        currentPage={currentPage}
        mkUrl={makeUrl}
        disabled={loading || userPhonesData?.contacts?.length === 0}
      />
    </div>
  );
};

export default UserPhonesListTable;
