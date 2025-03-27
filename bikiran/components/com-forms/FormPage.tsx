import React from "react";
import BasicFormComp from "./BasicFormComp";
import GridFormComp from "./GridFormComp";
import Footer from "@/bikiran/shared/footer/Footer";

const FormPage = () => {
  return (
    <div className="container">
      <div className="pt-6 md:pt-11 pb-[150px]">
        <BasicFormComp />
        <GridFormComp />
      </div>
      <div className="mt-10 border-t pt-2 pb-5 border-[#ffff]/10">
        <Footer />
      </div>
    </div>
  );
};

export default FormPage;
