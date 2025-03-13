"use client";

import React, { FC } from "react";
import { useGatewayTransaction } from "./context/GetwayTransactionProvider";
import GatewayTransactionTableHeaderComp from "./GatewayTransactionTableHeaderComp";
import GatewayTransactionTableBodyComp from "./GatewayTransactionTableBodyComp";
import GatewayTransactionSkeletonComp from "./GatewayTransactionSkeletonComp";

const GatewayTransactionTableSection: FC<{ gatewayTransaction: any }> = ({
  gatewayTransaction,
}) => {
  const { reFetching } = useGatewayTransaction();

  if (gatewayTransaction === undefined) {
    return (
      <div className="flex flex-col gap-3">
        <table className="table-container">
          <GatewayTransactionTableHeaderComp />
          <GatewayTransactionSkeletonComp />
        </table>
      </div>
    );
  }
  if (gatewayTransaction === null) {
    return (
      <div className="flex flex-col gap-3">
        <table>
          <GatewayTransactionTableHeaderComp />
          <tbody className="table-container">
            <tr>
              <td colSpan={8} className="text-center font-medium text-lg">
                No Gateway-Transaction Found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  if (reFetching) {
    return (
      <div className="flex flex-col gap-3 ">
        <table className="table-container">
          <GatewayTransactionTableHeaderComp />
          <GatewayTransactionSkeletonComp rows={gatewayTransaction} />
        </table>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <table className="table-container">
        <GatewayTransactionTableHeaderComp />
        <GatewayTransactionTableBodyComp data={gatewayTransaction} />
      </table>
    </div>
  );
};

export default GatewayTransactionTableSection;
