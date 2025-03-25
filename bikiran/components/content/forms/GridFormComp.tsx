import {
  InputDate,
  InputField,
  SelectOption,
  TextareaField,
} from "@/bik-lib/lib/Input";
import React, { useState } from "react";

const GridFormComp = () => {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev: any) => {
        return { ...prev, [name]: value ? value : "" };
      });
    }
  };
  return (
    <section>
      <div className="border border-[#FFFFFF]/10 rounded-20 mt-5 px-3 md:px-7.5 py-5 bg-[#19181F]">
        {/* Title & Description */}

        <div>
          <p className="font-medium text-xl">
            Grid Form <span className="text-[#14B9FF]"> #</span>
          </p>
          <p className="text-sm text-[#F3F4F6]/70 mt-1 text-justify">
            Form controls are styled with a mix of Sass and CSS variables,
            allowing them to adapt to color modes and support any customization
            method.
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          <div className="md:flex gap-2">
            <InputField
              label="Name"
              name="name"
              formData={formData}
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
            <InputField
              label="Email Address"
              name="email"
              formData={formData}
              onChange={handleChange}
              placeholder="Enter Your Email Address"
            />
          </div>
          <div className="md:flex gap-2">
            <InputField
              label="City"
              name="name"
              formData={formData}
              onChange={handleChange}
              placeholder="Enter Your Name"
            />
            <SelectOption
              formData={formData}
              name="role"
              onChange={handleChange}
              label="State"
              //   options={roleType.map((item) =>
              //     addOption(item.id, item.title, item.id)
              //   )}
              placeholder="State"
            />
            <InputDate
              label="Date of Birth"
              name="schedule"
              type="datetime-local"
              formData={formData}
              onChange={handleChange}
            />
            <InputField
              label="Zip Code"
              name="zip"
              formData={formData}
              onChange={handleChange}
              placeholder="Enter Your Zip Code"
            />
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
          <div className="h-[280px] overflow-y-scroll custom-scrollbar px-5 py-3 flex gap-10">
            <code>
              <span className="text-[#FF7E7E]">{`<SelectOption`}</span> <br />
              <span className="text-[#14B9FF]">{`formData={formData}`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`name="role"`}</span> <br />
              <span className="text-[#FF7E7E]">{`formData={formData}`}</span>{" "}
              <br />
              <span className="text-[#14B9FF]">{`onChange={handleChange}`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`options={roleType.map((item) =>
                  addOption(item.id, item.title, item.id)
                )}`}</span>{" "}
              <br />
              <span className="text-[#14B9FF]">{`placeholder="State"`}</span><br />
              <span className="text-[#FF7E7E]">{`/>`}</span> <br />
            </code>
            <code>
              {/*  */}
              <span className="text-[#FF7E7E]">{`<InputDate`}</span> <br />
              <span className="text-[#14B9FF]">{`label="Date of Birth"`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`name="schedule"`}</span>{" "}
              <br />
              <span className="text-[#FF7E7E]">{`type="datetime-local"`}</span>{" "}
              <br />
              <span className="text-[#14B9FF]">{`formData={formData}`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`onChange={handleChange}`}</span>
              <br />
              <span className="text-[#FF7E7E]">{`/>`}</span> <br />
            </code>
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
    </section>
  );
};

export default GridFormComp;
