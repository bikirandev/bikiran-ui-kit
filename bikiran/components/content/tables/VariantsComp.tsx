"use client";
import { bgColorMap, variantData } from "./constant";

const VariantsComp = () => {
  return (
    <div>
      <div className="flex justify-between items-center mt-10">
        <h2 className="font-medium text-xl md:text-3xl">Variants </h2>
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
      <p className="font-normal text-sm md:text-base mt-3 text-primary-700 text-justify">
        Use contextual classes to color tables, table rows or individual cells.
      </p>
      <p className="font-normal text-sm md:text-base my-4 text-primary-700 text-justify bg-[#CFF4FC] p-3">
        <span className="font-bold text-sm md:text-base">Heads up!</span>{" "}
        Because of the more complicated CSS used to generate our table variants,
        they most likely won’t see color mode adaptive styling.
      </p>

      <div className="overflow-x-auto">
        <table className="table-container border rounded-15 mt-4">
          <thead>
            <tr className="[&>th]:!font-semibold [&>th]:!text-base [&>th]:!text-center">
              <th>Class</th>
              <th>Heading</th>
              <th>Heading</th>
            </tr>
          </thead>
          <tbody>
            {/* table data */}
            {variantData.map((user, index) => (
              <tr
                key={index}
                className={`border-b border-gray-200 ${bgColorMap[user.class]} ${user.class === "primary" ? "text-white" : ""}`}
              >
                <td className="text-center !font-medium !text-base">
                  {user.class}
                </td>
                <td className="text-center">{user.heading1}</td>
                <td className="text-center">{user.heading2}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VariantsComp;
