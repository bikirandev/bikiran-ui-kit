import BasicTableComp from "./BasicTableComp";
import UserInfoTableComp from "./UserInfoTableComp";
import VariantTableComp from "./VariantTableComp";

const TablePage = () => {
  return (
    <div className="container">
      <div className="pt-6 md:pt-11 pb-[150px]">
        <BasicTableComp />
        <UserInfoTableComp />
        <VariantTableComp />
      </div>
    </div>
  );
};

export default TablePage;
