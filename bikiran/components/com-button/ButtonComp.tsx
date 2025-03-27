import Button, { TButtonVariant } from "@/bik-lib/lib/button";

interface ButtonCompProps {
  title: string;
  description: string;
  variantList: {
    id: number;
    variant: string;
    title: string;
  }[];
  roundedClass?: string;
}

const ButtonComp = ({
  title,
  description,
  variantList,
  roundedClass,
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
        <div className="flex gap-2 pt-4 md:mp-5 flex-wrap">
          {variantList.map((item) => (
            <Button
              key={item.id}
              variant={item.variant as TButtonVariant}
              className={roundedClass}
            >
              {item.title}
            </Button>
          ))}
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
        <div className="h-[280px] overflow-y-scroll custom-scrollbar px-5 py-3">
          <p className="text-sm mb-3">-- {title} --</p>
          {variantList.map((item) => (
            <ul key={item.id} className="pt-1">
              <p className="text-white">
                <span className="text-info">{`<Button `}</span>
                {`variant= "`}
                <span className="text-[#FF7E7E]">{item.variant}</span>
                {`"> `}
                <span className="text-green-500">{"button"}</span>
                {"</Button>"}
              </p>
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

export default ButtonComp;
