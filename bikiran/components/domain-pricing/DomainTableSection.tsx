import React, { FC, useState } from "react";
import { useDomain } from "./context/DomainPricingProvider";
import Pagination from "@/bikiran/shared/pagination/Pagination";
import DomainTableBodyComp from "./DomainTableBodyComp";
import DomainTableSkeletonComp from "./DomainTableSkeletonComp";
import { TDomainPrice } from "./DomainTypes";

const DomainTableSection: FC<{ data: any }> = ({ data }) => {
  const { loading } = useDomain();

  return (
    <div className="flex flex-col gap-3">
      <table cellPadding={0} cellSpacing={0} className="table-container">
        <thead>
          <tr className="  px-5">
            <th className="!w-[100px] !text-center">ID</th>
            <th className="w-[150px] text-start">TLD</th>
            <th className="w-[150px] ">Price</th>
            <th className="w-[180px] ">Restore Price</th>
            <th className="w-[180px] ">Transfer & renew Price</th>
            <th className="w-[180px] ">Redemption Price</th>
            <th className="w-[150px] text-center">Duration</th>
            <th className="w-[100px] text-center">Status</th>
            <th className="!w-[50px]  !text-center ">#</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: data?.domainPackages.length || 2 })
              .map((_, i) => i)
              .map((i) => <DomainTableSkeletonComp key={i} />)
          ) : (
            <DomainTableBodyComp data={data.domainPackages} />
          )}
          {!loading && data.domainPackages.length === 0 && (
            <tr className="hover:!bg-transparent">
              <td colSpan={8} className="text-center font-medium !text-xl h-40">
                No Domain Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* <Pagination
        totalData={Array.isArray(data) ? data.domainPackages.length : 0}
        dataPerPage={dataPerPage}
        setCurrentPage={setCurrentPage}
      /> */}
    </div>
  );
};

export default DomainTableSection;
