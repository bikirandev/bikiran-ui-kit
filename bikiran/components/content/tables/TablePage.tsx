import OverviewComp from "./OverviewComp";
import VariantsComp from "./VariantsComp";

const TablePage = () => {
  return (
    <div className="container">
      <div className="pt-6 md:pt-11 pb-[150px]">
        <OverviewComp />
        <VariantsComp />
      </div>
    </div>
  );
};

export default TablePage;
