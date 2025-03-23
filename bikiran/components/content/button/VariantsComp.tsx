"use client";

const VariantsComp = () => {
  return (
    <div>
      <h2 className="font-medium text-3xl md:text-5xl">Buttons</h2>
      <p className="font-normal text-sm md:text-lg mt-3 text-primary-700">
        Use Bootstrap’s custom button styles for actions in forms, dialogs, and
        more with support for multiple sizes, states, and more.
      </p>
      <div className="flex justify-between items-center mt-10">
        <h2 className="font-medium text-xl md:text-3xl">Variants</h2>

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
        Bootstrap includes several button variants, each serving its own
        semantic purpose, with a few extras thrown in for more control.
      </p>

      <div className="overflow-x-auto">
        <div className="border p-2 rounded-5 mt-4">
          <div className="flex gap-2 md:justify-between items-center pt-4 md:pt-10 md:px-10 flex-wrap">
            <button className="bg-primary text-white px-3 py-1 rounded-5">
              Primary
            </button>
            <button className="bg-secondary text-white px-3 py-1 rounded-5">
              Secondary
            </button>
            <button className="bg-success px-3 py-1 rounded-5">Success</button>
            <button className="bg-error text-white px-3 py-1 rounded-5">
              Danger
            </button>
            <button className="bg-warning  px-3 py-1 rounded-5">Warning</button>
            <button className="bg-light-red px-3 py-1 rounded-5">Light</button>
          </div>

          <div className="mt-10 md:ml-10">
            <tr>
              <code>
                <span className="text-red-600">{"<button"}</span>{" "}
                {`className="bg-primary px-3 py-1 rounded-5">`}
                <span className="text-red-500 font-bold">Primary</span>
                {`</button>`}
              </code>
            </tr>
            <tr className="">
              <code>
                <span className="text-red-600">{"<button"}</span>{" "}
                {`className="bg-secondary px-3 py-1 rounded-5">`}
                <span className="text-red-500 font-bold">Secondary</span>
                {`</button>`}
              </code>
            </tr>
            <tr className="">
              <code>
                <span className="text-red-600">{"<button"}</span>{" "}
                {`className="bg-success px-3 py-1 rounded-5">`}
                <span className="text-red-500 font-bold">Success</span>
                {`</button>`}
              </code>
            </tr>
            <tr className="">
              <code>
                <span className="text-red-600">{"<button"}</span>{" "}
                {`className="bg-error px-3 py-1 rounded-5">`}
                <span className="text-red-500 font-bold">Danger</span>
                {`</button>`}
              </code>
            </tr>
            <tr className="">
              <code>
                <span className="text-red-600">{"<button"}</span>{" "}
                {`className="bg-warning px-3 py-1 rounded-5">`}
                <span className="text-red-500 font-bold">Warning</span>
                {`</button>`}
              </code>
            </tr>
            <tr className="">
              <code>
                <span className="text-red-600">{"<button"}</span>{" "}
                {`className="bg-light px-3 py-1 rounded-5">`}
                <span className="text-red-500 font-bold">Light</span>
                {`</button>`}
              </code>
            </tr>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantsComp;
