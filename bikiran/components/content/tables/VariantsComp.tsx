import React from "react";
import { variantData } from "./constant";

const VariantsComp = () => {
  const bgColorMap = {
    Default: "bg-white",
    Primary: "bg-[#130f40]", // Custom indigo color
    Secondary: "bg-[#ae00b9]", // Custom gray color
    Success: "bg-[#00b15b]", // Custom green color
    Danger: "bg-[#ffa113]", // Custom red color
    Info: "bg-[#CFF4FC]", // Custom blue color
    Warning: "bg-[#ffa113]", // Custom yellow color
    Light: "bg-[#F3F4F6]", // Custom light gray color
    Dark: "bg-[#1F2937]", // Custom dark gray color
  };

  return (
    <div>
      <div className="flex justify-between items-center  mt-10">
        <h2 className="font-medium text-3xl mt-5">Variants </h2>
        <button className="border px-2 py-1 text-sm hover:border-blue-600 rounded-5">
          View on Github
        </button>
      </div>
      <p className="font-normal text-base mt-3 text-primary-700 text-justify">
        Use contextual classes to color tables, table rows or individual cells.
      </p>
      <p className="font-normal text-base mt-3 text-primary-700 text-justify">
        Using the most basic table markup, here’s how .table-based tables look
        in Bootstrap.
      </p>

      <table className="table-container table-fixed border rounded-15 mt-4">
        <thead>
          <tr>
            <th className="text-center w-[50px] !font-bold !text-base">
              Class
            </th>
            <th className="text-center w-[50px] !font-bold !text-base">
              Heading
            </th>
            <th className="text-center w-[20px] !font-bold !text-base">
              Heading
            </th>
          </tr>
        </thead>
        <tbody>
          {/*  */}
          {variantData.map((user, index) => (
            <tr
              key={index}
              className={`border-b border-gray-200 ${bgColorMap[user.class]} ${user.class === "Primary" ? "text-white" : ""}`}
            >
              <td className="text-center !font-bold !text-base">
                {user.class}
              </td>
              <td className="text-center">{user.heading1}</td>
              <td className="text-center">{user.heading2}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VariantsComp;
