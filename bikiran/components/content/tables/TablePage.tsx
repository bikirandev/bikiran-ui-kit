import React from "react";
import OverviewComp from "./OverviewComp";
import VariantsComp from "./VariantsComp";

const TablePage = () => {
  return (
    <div className="pt-[45px] px-[105px] pb-16">
      <OverviewComp />
      <VariantsComp />
    </div>
  );
};

export default TablePage;
