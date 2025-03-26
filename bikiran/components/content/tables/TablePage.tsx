import BasicTableComp from "./BasicTableComp";
import VariantTableComp from "./VariantTableComp";

const TablePage = () => {
  return (
    <div className="container">
      <div className="pt-6 md:pt-11 pb-[150px]">
        <BasicTableComp/>
        <VariantTableComp />
      </div>
    </div>
  );
};

export default TablePage;
