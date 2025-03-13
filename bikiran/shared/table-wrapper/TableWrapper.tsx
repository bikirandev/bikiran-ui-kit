import React, {
  Children,
  FC,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";
import "./style.css";
import TableSkeleton from "./TableSkeleton";
import MobileSkeleton from "./MobileSkeleton";

const TableWrapper: FC<{
  children: ReactNode;
  loading: boolean;
  headers: string[];
  notFoundText?: string;
}> = ({ children, loading, headers, notFoundText }) => {
  const isArray = Array.isArray(children);

  const length = isArray && children?.length !== 0 ? children.length - 1 : 3;
  const placeholderArr = Array.from({ length }).map((_, i) => i);

  // Check if table has # action column
  const isTableHasAction =
    headers?.[headers.length - 1]?.split("+")[0]?.trim() === "#";

  // Remove the last column if it is action column
  const placeholderTds: string[] = isTableHasAction
    ? headers?.slice(0, headers.length - 1)
    : headers;

  const placeholderData = {
    arr: placeholderArr,
    tds: placeholderTds,
    isTableHasAction,
  };

  // Generate mobile cards from table rows
  const mobileData = isArray
    ? Children.map(children, (child: ReactNode) => {
        if (isValidElement(child)) {
          const tds = Children.toArray(
            (child as ReactElement<{ children: ReactNode }>)?.props.children
          );

          return (
            <div className="p-4 border rounded-2xl shadow-md mb-4 bg-white">
              {tds.map((td: any, index: number) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-3"
                >
                  <span className="text-sm font-medium text-primary-500">
                    {headers[index]?.split("+")[0]}
                  </span>
                  <span className="text-sm font-medium text-primary max-w-[60%] text-right break-words truncate">
                    {td.props.children || "--"}
                  </span>
                </div>
              ))}
            </div>
          );
        }
        return null;
      })
    : null;

  return (
    <div>
      {/* Desktop Table (visible on screens >= 991px) */}
      <table className="table-container hidden lg:table">
        <thead>
          <tr>
            {headers.map((header, index) => {
              const className = header?.split("+")[1] || "";
              const headerText = header?.split("+")[0] || "Not Set";
              return (
                <th key={`header${index}`} className={className}>
                  {headerText}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          <TableSkeleton show={loading} data={placeholderData} />

          {!loading && isArray && children.length === 0 && (
            <tr className="not-found">
              <td colSpan={headers.length} className="text-center">
                {notFoundText || "No data found"}
              </td>
            </tr>
          )}
          {!loading && children}
        </tbody>
      </table>

      {/* Mobile Table (visible on screens < 991px) */}
      <div className="lg:hidden">
        <MobileSkeleton show={loading} data={placeholderData} />

        {!loading && mobileData}
      </div>
    </div>
  );
};

export default TableWrapper;
