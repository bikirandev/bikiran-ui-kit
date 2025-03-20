import React from "react";
import { overviewData } from "./constant";

const OverviewComp = () => {
  return (
    <div>
      <h2 className="font-medium text-5xl">Tables</h2>
      <p className="font-normal text-lg mt-3 text-primary-700">
        Documentation and examples for opt-in styling of tables (given their
        prevalent use in JavaScript plugins) with Bootstrap.
      </p>

      <h2 className="font-medium text-3xl mt-5">Overview</h2>
      <p className="font-normal text-base mt-3 text-primary-700 text-justify">
        Due to the widespread use of elements across third-party widgets like
        calendars and date pickers, Bootstrap’s tables are opt-in. Add the base
        class .table to any then extend with our optional modifier classes or
        custom styles. All table styles are not inherited in Bootstrap, meaning
        any nested tables can be styled independent from the parent.
      </p>
      <p className="font-normal text-base mt-3 text-primary-700 text-justify">
        Using the most basic table markup, here’s how .table-based tables look
        in Bootstrap.
      </p>

      <table className="table-container table-fixed border rounded-15 mt-4">
        <thead>
          <tr>
            <th className="!text-center w-[20px]">#</th>

            <th className="text-center w-[50px]">Fast</th>
            <th className="text-center w-[50px]">Last</th>
            <th className="text-center w-[20px]">Handle</th>
          </tr>
        </thead>

        <tbody>
          {/*  */}
          {overviewData.map((user, index) => (
            <tr key={index} className="border-b border-gray-200 ">
              <td className="!text-center">{user.id}</td>
              <td className="text-center">{user.firstName}</td>
              <td className="text-center">{user.lastName}</td>
              <td className="text-center">{user.handle}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverviewComp;
