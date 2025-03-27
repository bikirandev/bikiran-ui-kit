import { overviewData } from "./constant";

const VariantTableComp = () => {
  return (
    <section>
      <div className="border border-[#FFFFFF]/10 rounded-20 mt-5 px-3 md:px-7.5 py-5 bg-[#19181F]">
        <div>
          <p className="font-medium text-xl">
            Variant Table <span className="text-[#14B9FF]"> #</span>
          </p>
          <p className="text-sm text-[#F3F4F6]/70 mt-1 text-justify">
            Form controls are styled with a mix of Sass and CSS variables,
            allowing them to adapt to color modes and support any customization
            method.
          </p>
        </div>

        <div className="overflow-x-auto mt-4 rounded-10">
          <table className="table-container-variant w-full">
            <thead>
              <tr>
                <th className="!text-center w-[50px]">#</th>
                <th className="text-center w-[150px]">Fast</th>
                <th className="text-center w-[150px]">Last</th>
                <th className="text-center w-[150px]">User Info</th>
              </tr>
            </thead>

            <tbody>
              {overviewData.map((user, index) => (
                <tr
                  key={index}
                  className={`${
                    user.id === 1
                      ? "bg-primary-700"
                      : user.id === 2
                        ? "bg-secondary"
                        : user.id === 3
                          ? "bg-danger"
                          : user.id === 4
                            ? "bg-light"
                            : user.id === 5
                              ? "bg-warning"
                              : user.id === 6
                                ? "bg-royalBlue"
                                : "bg-gray-500"
                  } text-white`}
                >
                  <td className="!text-center">{user.id}</td>
                  <td className="text-center">{user.firstName}</td>
                  <td className="text-center">{user.lastName}</td>
                  <td className="text-center">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border border-[#FFFFFF]/10 mt-8 rounded-15">
          <div className="flex justify-between bg-[#1F1E25] border-b rounded-t-15 border-[#FFFFFF]/10 px-5 py-3">
            <p>HTML</p>
            <button className="border border-[#12C55C] px-2.5 py-1 rounded-8 hover:bg-[#12C55C]">
              Copy
            </button>
          </div>
          <div className="h-[280px] overflow-y-scroll custom-scrollbar px-5 py-3 flex gap-10">
            <code>
              <span className="text-secondary">{`<tr className="bg-secondary">`}</span>{" "}
              <br />
              <span className="text-primary-700">{`<tr className="bg-primary-700">`}</span>{" "}
              <br />
              <span className="text-success">{`<tr className="bg-success">`}</span>{" "}
              <br />
              <span className="text-info">{`<tr className="bg-info">`}</span>{" "}
              <br />{" "}
              <span className="text-pink">{`<tr className="bg-pink">`}</span>{" "}
              <br />
              <span className="text-royalBlue">{`<tr className="bg-royalBlue">`}</span>{" "}
              <br />
              <span className="text-orange">{`<tr className="bg-orange">`}</span>{" "}
              <br />
              <span className="text-warning">{`<tr className="bg-success">`}</span>{" "}
              <br />
            </code>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="bg-[#FFDC5D]/5 rounded-10 px-5 py-4.5 mt-6 border-l-2 border-[#FFDC5D]">
          <p className="text-base text-[#44CAB3]">
            Accessibility tip: Using color to add meaning only provides a visual
            indication, which will not be conveyed to users of assistive
            technologies like screen readers. Please ensure the meaning is
            obvious from the content itself (e.g., the visible text with
            a sufficient color contrast) or is included through alternative
            means, such as additional text hidden with
            the .visually-hidden class.
          </p>
        </div>
      </div>
    </section>
  );
};

export default VariantTableComp;
