"use client";
import ButtonComp from "./ButtonComp";
import { buttonVariants, outlineVariants } from "./constants";

const DefaultButtonComp = () => {
  return (
    <section>
      
      <div className="flex justify-between items-center mt-10">
        <h2 className="font-medium text-xl md:text-3xl">Buttons</h2>

        <button
          className="border px-2 py-1 text-sm hover:border-blue-600 rounded-5"
          onClick={() =>
            window.open(
              "https://www.npmjs.com/package/bik-button?activeTab=readme"
            )
          }
        >
          View on Github
        </button>
      </div>

      <ButtonComp
        title="Default Buttons"
        description="The .btn classes are designed to be used with the <button> element. However, you can also use these classes on <a> elements (though some browsers may apply slightly different rendering)."
        variantList={buttonVariants}
      />
      <ButtonComp
        title="Rounded Buttons"
        description="These buttons come with extra border-radius applied to make them more rounded."
        variantList={buttonVariants}
        roundedClass="!rounded-20"
      />
      <ButtonComp
        title="Outline Buttons"
        description="These buttons come with extra border-radius applied to make them more rounded."
        variantList={outlineVariants}
      />
    </section>
  );
};

export default DefaultButtonComp;
