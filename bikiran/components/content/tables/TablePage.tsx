import React from "react";
import OverviewComp from "./OverviewComp";
import VariantsComp from "./VariantsComp";

const TablePage = () => {
  return (
    <div className="pt-[45px] px-[65px] mb-[100px]">
      <OverviewComp />
      <VariantsComp />
    </div>
  );
};

export default TablePage;
