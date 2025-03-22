import React from "react";
import OverviewComp from "./OverviewComp";
import VariantsComp from "./VariantsComp";

const TablePage = () => {
  return (
    <div className="container">
      <div className="pt-11 mb-[100px]">
        <OverviewComp />
        <VariantsComp />
      </div>
    </div>
  );
};

export default TablePage;
