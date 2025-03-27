import Footer from "@/bikiran/shared/footer/Footer";
import DefaultButtonComp from "./DefaultButtonComp";

const ButtonPage = () => {
  return (
    <div className="container">
      <div className="pt-6 md:pt-11 pb-[150px]">
        <DefaultButtonComp />
        <div className="mt-10 border-t pt-2 pb-5 border-[#ffff]/10">
        <Footer />
      </div>
      </div>
    </div>
  );
};

export default ButtonPage;
