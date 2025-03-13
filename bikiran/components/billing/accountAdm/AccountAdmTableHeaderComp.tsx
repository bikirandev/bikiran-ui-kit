import React from "react";

const AccountAdmTableHeaderComp = () => {
  return (
    <thead>
      <tr>
        <th className="w-[100px] !text-center">FAC</th>
        <th className="w-[80px] text-center">User</th>
        <th className=" text-left">Title</th>
        <th className="w-[200px] text-start">Total Debit - Total Credit</th>
        <th className="w-[100px]">Balance</th>
        <th className="w-[100px] ">Currency</th>
        <th className="w-[100px] ">Last Transaction</th>
        <th className="w-[80px] ">Status</th>
        <th className="w-[50px] !text-center ">#</th>
      </tr>
    </thead>
  );
};

export default AccountAdmTableHeaderComp;
