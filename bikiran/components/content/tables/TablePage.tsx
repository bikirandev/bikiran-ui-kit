import BasicTableComp from "./BasicTableComp";
import VariantsComp from "./VariantsComp";

const TablePage = () => {
  return (
    <div className="container">
      <div className="pt-6 md:pt-11 pb-[150px]">
        <BasicTableComp/>
        <VariantsComp />
      </div>
    </div>
  );
};

export default TablePage;
