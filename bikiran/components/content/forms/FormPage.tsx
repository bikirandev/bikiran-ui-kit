import React from "react";
import BasicFormComp from "./BasicFormComp";
import GridFormComp from "./GridFormComp";

const FormPage = () => {
  return (
    <div className="container">
      <div className="pt-6 md:pt-11 pb-[150px]">
        <BasicFormComp />
        <GridFormComp />
      </div>
    </div>
  );
};

export default FormPage;
