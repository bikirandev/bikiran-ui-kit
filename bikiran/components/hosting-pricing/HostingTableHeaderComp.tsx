import React from "react";

const HostingTableHeaderComp = () => {
  return (
    <thead>
      <tr>
        <th className="w-[100px] !text-center">ID</th>
        <th className="w-[130px] text-center">Type</th>
        <th className="w-[200px] text-center">Disk</th>
        <th className="w-[130px] text-center">Bandwidth</th>
        <th className="w-[130px] text-center">CPU</th>
        <th className="w-[130px] text-center">RAM</th>
        <th className="w-[130px] text-center">Location</th>
        <th className="w-[130px] text-center">Price</th>
        <th className="w-[130px] text-center">Setup Price</th>
        <th className="w-[130px] text-center">Restore Price</th>
        <th className="w-[130px] text-center">Status</th>
        <th className="!text-center w-[50px]">#</th>
      </tr>
    </thead>
  );
};

export default HostingTableHeaderComp;
