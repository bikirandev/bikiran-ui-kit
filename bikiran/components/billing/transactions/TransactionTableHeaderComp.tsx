import React from "react";

const TransactionTableHeaderComp = () => {
  return (
    <thead>
      <tr>
        <th className="!text-center w-[100px]">ID</th>
        <th className="text-center w-[150px]">Invoice ID</th>
        <th className="text-center w-[100px]">Type</th>
        <th className="text-left ">Description</th>
        {/* <th className="text-center w-[120px]">Debit Amount</th>
        <th className="text-center w-[120px]">Credit Amount</th> */}
        <th className="text-start w-[150px]">Debit - Credit</th>
        <th className="text-center w-[100px]">Balance</th>
        <th className="text-center w-[120px]">Time Created</th>
        <th className="text-center w-[100px]">Status</th>
        <th className="text-right w-[50px]">#</th>
      </tr>
    </thead>
  );
};

export default TransactionTableHeaderComp;
