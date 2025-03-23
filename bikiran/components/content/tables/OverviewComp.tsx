"use client";
import { overviewData } from "./constant";

const OverviewComp = () => {
  return (
    <div>
      <h2 className="font-medium text-3xl md:text-5xl">Tables</h2>

      <p className="font-normal text-sm md:text-lg mt-3 text-primary-700">
        Documentation and examples for opt-in styling of tables (given their
        prevalent use in JavaScript plugins) with Bootstrap.
      </p>

      <div className="flex justify-between items-center mt-10">
        <h2 className="font-medium text-xl md:text-3xl">Overview</h2>

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
        Due to the widespread use of elements across third-party widgets like
        calendars and date pickers, Bootstrap’s tables are opt-in. Add the base
        class .table to any then extend with our optional modifier classes or
        custom styles. All table styles are not inherited in Bootstrap, meaning
        any nested tables can be styled independent from the parent.
      </p>
      <p className="font-normal text-sm md:text-base mt-3 text-primary-700 text-justify">
        Using the most basic table markup, here’s how .table-based tables look
        in Bootstrap.
      </p>

      <div className="overflow-x-auto border mt-4 md:p-5 rounded-10">
        <table className="table-container w-full">
          <thead>
            <tr>
              <th className="!text-center w-[50px]">#</th>
              <th className="text-center w-[150px]">Fast</th>
              <th className="text-center w-[150px]">Last</th>
              <th className="text-center w-[150px]">Handle</th>
              <th className="text-center w-[150px]">Handle</th>
            </tr>
          </thead>

          <tbody>
            {overviewData.map((user, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="!text-center">{user.id}</td>
                <td className="text-center">{user.firstName}</td>
                <td className="text-center">{user.lastName}</td>
                <td className="text-center">{user.handle}</td>
                <td className="text-center">{user.handle}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OverviewComp;
