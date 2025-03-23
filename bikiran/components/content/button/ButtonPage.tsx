import DefaultButtonComp from "./DefaultButtonComp";
import VariantsComp from "./VariantsComp";

const ButtonPage = () => {
  return (
    <div className="container">
      <div className="pt-6 md:pt-11 pb-[150px]">
        {/* <VariantsComp /> */}
        <DefaultButtonComp/>
      </div>
    </div>
  );
};

export default ButtonPage;
