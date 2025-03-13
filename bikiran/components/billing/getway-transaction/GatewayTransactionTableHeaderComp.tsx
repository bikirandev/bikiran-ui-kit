import React from "react";

const GatewayTransactionTableHeaderComp = () => {
  return (
    <thead>
      <tr>
        <th className="!w-[100px] !text-center">ID</th>
        <th className="w-[100px]">Invoice ID</th>
        <th className="w-[200px]">Project ID</th>
        <th className="w-[200px]">Gateway ID</th>
        <th className="w-[220px]">Transaction Amount</th>
        <th className="w-[220px]">Time Created</th>
        <th className="w-[80px]">Status</th>
        <th className="w-[50px] text-right">#</th>
      </tr>
    </thead>
  );
};

export default GatewayTransactionTableHeaderComp;
