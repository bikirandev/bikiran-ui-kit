import { buttonVariants } from "./constants";

const DefaultButtonComp = () => {
  return (
    <section>
      <h2 className="font-medium text-3xl leading-[45px] border-b border-[#FFFFFF]/10">
        Buttons
      </h2>
      <div className="border border-[#FFFFFF]/10 rounded-20 mt-5 px-7.5 py-5 bg-[#19181F]">
        {/*  */}
        <div className="">
          <p className="font-medium text-xl">
            Default Buttons <span className="text-[#14B9FF]"> #</span>
          </p>
          <p className="text-sm text-[#F3F4F6]/70 mt-1">
            The .btn classes are designed to be used with the element. However,
            you can also use these classes on elements (though some browsers may
            apply a slightly different rendering).
          </p>

          <div className="flex gap-2 pt-4 md:mp-5 flex-wrap">
            {buttonVariants.map((item) => (
              <button
                key={item.id}
                className={`btn px-5 py-2.5 rounded-10 ${item.class}`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/*  */}
        <div className="border border-[#FFFFFF]/10 mt-5 rounded-15 ">
          <div className="flex justify-between bg-[#1F1E25] border-b rounded-t-15 border-[#FFFFFF]/10 px-5 py-3 ">
            <p>HTML</p>
            <button className="border border-[#12C55C] px-2.5 py-1 rounded-8 hover:bg-[#12C55C]">
              Copy
            </button>
          </div>
          <div className="px-5 py-3">
            <p className="text-sm mb-3">-- Default Buttons --</p>
            {buttonVariants.map((item) => (
              <ul key={item.id} className="pt-1">
                <code>
                  <span className="text-[#5DFFD9]">{"<button"}</span>{" "}
                  <span className="text-[#14B9FF]">{`type`}</span>
                  <span className="text-[#5DFFD9]">{`="`}</span>
                  <span className="text-[#FF7E7E]">{`button`}</span>
                  <span className="text-[#5DFFD9]">{`"`}</span>{" "}
                  <span className="text-[#14B9FF]">{`className`}</span>
                  <span className="text-[#5DFFD9]">{`="`}</span>
                  <span className="text-[#FF7E7E]">{`${item.class}`}</span>
                  <span className="text-[#5DFFD9]">{`">`}</span>
                  <span className=" font-bold">Light</span>
                  <span className="text-[#5DFFD9]">{"</button>"}</span>
                </code>
              </ul>
            ))}
          </div>
        </div>

        <div className="bg-[#FFDC5D]/5 rounded-10 px-5 py-4 mt-6 border-l-2 border-[#FFDC5D]">
          <p className="text-base">
            If you are using the .btn class on its own, remember to at least
            define some explicit :focus and/or :focus-visible styles.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DefaultButtonComp;
