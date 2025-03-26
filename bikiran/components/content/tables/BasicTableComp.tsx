"use client";
import { overviewData } from "./constant";

const BasicTableComp = () => {
  return (
    <section>
      <div className="pb-2 border-b border-[#FFFFFF]/10">
        <div className="flex justify-between items-center mt-10F">
          <h2 className="font-medium text-3xl leading-[45px]">Tables</h2>
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

        <p className="text-sm text-[#F3F4F6]/70">
          Due to the widespread use of elements across third-party widgets like
          calendars and date pickers, Bootstrap’s tables are opt-in. Add the
          base class .table to any then extend with our optional modifier
          classes or custom styles. All table styles are not inherited in
          Bootstrap, meaning any nested tables can be styled independent from
          the parent.
        </p>
      </div>

      <div className="border border-[#FFFFFF]/10 rounded-20 mt-5 px-3 md:px-7.5 py-5 bg-[#19181F]">
        <div>
          <p className="font-medium text-xl">
            Basic Table <span className="text-[#14B9FF]"> #</span>
          </p>
          <p className="text-sm text-[#F3F4F6]/70 mt-1 text-justify">
            Form controls are styled with a mix of Sass and CSS variables,
            allowing them to adapt to color modes and support any customization
            method.
          </p>
        </div>

        <div className="overflow-x-auto mt-4 rounded-10">
          <table className="table-container w-full">
            <thead>
              <tr>
                <th className="!text-center w-[50px]">#</th>
                <th className="text-center w-[150px]">Fast</th>
                <th className="text-center w-[150px]">Last</th>
                <th className="text-center w-[150px]">Email</th>
              </tr>
            </thead>

            <tbody>
              {overviewData.map((user, index) => (
                <tr key={index}>
                  <td className="!text-center">{user.id}</td>
                  <td className="text-center">{user.firstName}</td>
                  <td className="text-center">{user.lastName}</td>
                  <td className="text-center">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-[#FFFFFF]/10 mt-8 rounded-15 ">
          <div className="flex justify-between bg-[#1F1E25] border-b rounded-t-15 border-[#FFFFFF]/10 px-5 py-3 ">
            <p>HTML</p>
            <button className="border border-[#12C55C] px-2.5 py-1 rounded-8 hover:bg-[#12C55C]">
              Copy
            </button>
          </div>
          <div className="h-[280px] overflow-y-scroll custom-scrollbar px-5 py-3 flex gap-10">
            <code>
              <span className="text-[#FF7E7E]">{`<table className="table-container w-full">`}</span>
              <br />
              <span className="text-[#14B9FF]">{`<thead>`}</span> <br />
              <span className="text-[#5DFFD9]">{`<tr>`}</span> <br />
              <span className="text-[#FF7E7E]">{`<th className="!text-center w-[50px]">#</th>`}</span>{" "}
              <br />
              <span className="text-[#14B9FF]">{`<th className="text-center w-[50px]">Fast</th>`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`<th className="text-center w-[50px]">Last</th>`}</span>{" "}
              <br />
              <span className="text-[#FF7E7E]">{`<th className="text-center w-[50px]">Handle</th>`}</span>
              <br />
              <span className="text-[#5DFFD9]">{`</tr>`}</span> <br />
              <span className="text-[#14B9FF]">{`</thead>`}</span> <br />
              <span className="text-[#FF7E7E]">{`<tbody>`}</span> <br />
              <span className="text-[#5DFFD9]">{`<tr key={index}>`}</span>{" "}
              <br />
              <span className="text-[#14B9FF]">{`<td className="!text-center">{1}</td>`}</span>{" "}
              <br />
              <span className="text-[#FF7E7E]">{`<td className="text-center">{John}</td>`}</span>{" "}
              <br />
              <span className="text-[#5DFFD9]">{`<td className="text-center">{Smith}</td>`}</span>{" "}
              <br />
              <span className="text-[#14B9FF]">{`<td className="text-center">{john@gmail.com}</td>`}</span>{" "}
              <br />
              <span className="text-[#FF7E7E]">{`</tr>`}</span> <br />
              <span className="text-[#5DFFD9]">{`</tbody>`}</span> <br />
              <span className="text-[#14B9FF]">{`</table>`}</span> <br />
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

export default BasicTableComp;
