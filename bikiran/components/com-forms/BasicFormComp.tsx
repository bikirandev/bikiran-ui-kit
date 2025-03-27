"use client";
import { InputField, TextareaField } from "@/bik-lib/lib/Input";
import React, { useState } from "react";

const BasicFormComp = () => {
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
      <div className="pb-2 border-b border-[#FFFFFF]/10">
        <div className="flex justify-between items-center">
          <h2 className="font-medium text-xl md:text-3xl">Forms</h2>

          <button
            className="border px-2 py-1 text-sm hover:border-blue-600 rounded-5"
            onClick={() =>
              window.open(
                "https://www.npmjs.com/package/bik-inputs"
              )
            }
          >
            View on Github
          </button>
        </div>
        <p className="text-sm text-[#F3F4F6]/70 mt-5">
          Margin utilities are the easiest way to add some structure to forms.
          They provide basic grouping of labels, controls, optional form text,
          and form validation messaging. We recommend sticking to margin-bottom
          utilities, and using a single direction throughout the form for
          consistency.
        </p>
      </div>

      <div className="border border-[#FFFFFF]/10 rounded-20 mt-5 px-3 md:px-7.5 py-5 bg-[#19181F]">
        {/* Title & Description */}

        <div>
          <p className="font-medium text-xl">
            Basic Form <span className="text-[#14B9FF]"> #</span>
          </p>
          <p className="text-sm text-[#F3F4F6]/70 mt-1 text-justify">
            Form controls are styled with a mix of Sass and CSS variables,
            allowing them to adapt to color modes and support any customization
            method.
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          <InputField
            label="Phone"
            name="phoneNumber"
            formData={formData}
            onChange={handleChange}
            placeholder="Enter Your Phone Number"
          />
          <InputField
            label="Email Address"
            name="email"
            formData={formData}
            onChange={handleChange}
            placeholder="Enter Your Email Address"
          />
          <TextareaField
            label="text area"
            name="text area"
            formData={formData}
            onChange={handleChange}
            placeholder="Enter your text area"
            className="h-40"
          />
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
              <span className="text-[#FF7E7E]">{`<InputField`}</span> <br />
              <span className="text-[#14B9FF]">{`label="text area"`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`name="text area"`}</span>{" "}
              <br />
              <span className="text-[#FF7E7E]">{`formData={formData}`}</span>{" "}
              <br />
              <span className="text-[#14B9FF]">{`onChange={handleChange}`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`placeholder="Enter your text area"`}</span>{" "}
              <br />
              <span className="text-[#FF7E7E]">{`InputField/>`}</span> <br />
            </code>
            <code>
              {/*  */}
              <span className="text-[#FF7E7E]">{`<TextareaField`}</span> <br />
              <span className="text-[#14B9FF]">{`label="text area"`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`name="text area"`}</span>{" "}
              <br />
              <span className="text-[#FF7E7E]">{`formData={formData}`}</span>{" "}
              <br />
              <span className="text-[#14B9FF]">{`onChange={handleChange}`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`placeholder="Enter your text area"`}</span>
              <br />
              <span className="text-[#14B9FF]">{`className="h-40"`}</span>{" "}
              <br />
              <span className="text-[#FF7E7E]">{`TextareaField/>`}</span> <br />
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

export default BasicFormComp;
