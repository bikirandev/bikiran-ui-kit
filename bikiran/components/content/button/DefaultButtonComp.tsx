import Button, { TButtonVariant } from "@/bik-lib/lib/button";
import { buttonVariants, outlineVariants } from "./constants";

// ButtonComp.tsx
interface ButtonCompProps {
  title: string;
  description: string;
  variantList: {
    id: number;
    variant: string;
    title: string;
  }[];
  buttonClass: string;
}

const ButtonComp = ({
  title,
  description,
  variantList,
}: ButtonCompProps) => {
  return (
    <div className="border border-[#FFFFFF]/10 rounded-20 mt-5 px-3 md:px-7.5 py-5 bg-[#19181F]">
      {/* Title & Description */}

      <div>
        <p className="font-medium text-xl">
          {title} <span className="text-[#14B9FF]"> #</span>
        </p>
        <p className="text-sm text-[#F3F4F6]/70 mt-1 text-justify">
          {description}
        </p>

        {/* Actual Buttons */}
        <div className="flex gap-2 pt-4 md:mp-5 flex-wrap text-justify">
          {variantList.map((item) => (
            <Button
              key={item.id}
              variant={item.variant as TButtonVariant}

              // className={`btn ${buttonClass} ${title === "Outline Buttons" ? `hover:bg-[#12C55C]` : `btn-${item.class}`}`}
            >
              {item.title}
            </Button>
          ))}
           
            {/* <Button
              variant="green"
            >
              Button
            </Button>
            <Button
              variant="pink"
            >
              Button
            </Button>
            <Button
              variant="primary-line"
            >
              outline
            </Button> */}
        </div>
      </div>

      {/* HTML Code Preview */}
      <div className="border border-[#FFFFFF]/10 mt-5 rounded-15 ">
        <div className="flex justify-between bg-[#1F1E25] border-b rounded-t-15 border-[#FFFFFF]/10 px-5 py-3 ">
          <p>HTML</p>
          <button className="border border-[#12C55C] px-2.5 py-1 rounded-8 hover:bg-[#12C55C]">
            Copy
          </button>
        </div>
        <div className="px-5 py-3">
          <p className="text-sm mb-3">-- {title} --</p>
          {variantList.map((item) => (
            <ul key={item.id} className="pt-1">
              {
                `<Button variant=${item.variant}>{"button"}</Button>`
              }
              {/* <code>
                <Button variant={item.variant}>{"<button"}</Button>{" "}
                <Button className="text-[#14B9FF]">type="button"</Button>{" "}
                <Button className="text-[#FF7E7E]">{`className="${item.class}"`}</Button>
                <Button className="text-[#5DFFD9]">{">"}</Button>{" "}
                <Button className=" font-bold">{item.title}</Button>{" "}
                <Button className="text-[#5DFFD9]">{"</button>"}</Button>
              </code> */}
            </ul>
          ))}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="bg-[#FFDC5D]/5 rounded-10 px-5 py-4.5 mt-6 border-l-2 border-[#FFDC5D]">
        <p className="text-base text-[#D3C198]">
          If you are using the .btn class on its own, remember to at least
          define some explicit :focus and/or :focus-visible styles.
        </p>
      </div>
    </div>
  );
};

const DefaultButtonComp = () => {
  // const color = buttonVariants.map((item) => item.variant);
  // console.log(color);

  return (
    <section>
      <h2 className="font-medium text-3xl leading-[45px] border-b border-[#FFFFFF]/10">
        Buttons
      </h2>

      {/* You can render multiple types of buttons */}
      <ButtonComp
        title="Default Buttons"
        description="The .btn classes are designed to be used with the <button> element. However, you can also use these classes on <a> elements (though some browsers may apply slightly different rendering)."
        variantList={buttonVariants}
        buttonClass="rounded-10"
      />

      {/* Example: Add another dynamic group */}
      <ButtonComp
        title="Rounded Buttons"
        description="These buttons come with extra border-radius applied to make them more rounded."
        variantList={buttonVariants} // Or another array if you have it like roundedVariants
        buttonClass="rounded-20"
      />

      {/*  */}
      <ButtonComp
        title="Outline Buttons"
        description="These buttons come with extra border-radius applied to make them more rounded."
        variantList={outlineVariants} // Or another array if you have it like roundedVariants
        buttonClass={`rounded-10 `}
      />
    </section>
  );
};

export default DefaultButtonComp;
