import { MouseEvent, ReactNode } from "react";
import { cn } from "../utils/cn";

const cName = (variant: string) => {
  switch (variant) {
    case "primary":
      return "bg-secondary text-white";
    case "primary-line":
      return "border border-secondary text-secondary hover:bg-secondary hover:text-white";

    case "secondary":
      return "bg-primary-700 text-white";
    case "secondary-line":
      return "border border-primary-700 text-primary-700 hover:bg-primary-700 hover:text-white";

    case "success":
      return "bg-success text-white";
    case "success-line":
      return "border border-success text-success hover:bg-success hover:text-white";

    case "info":
      return "bg-info text-white";
    case "info-line":
      return "border border-info text-info hover:bg-info hover:text-black";

    case "warning":
      return "bg-warning text-white";
    case "warning-line":
      return "border border-warning text-warning hover:bg-warning hover:text-black";

    case "danger":
      return "bg-danger text-white";
    case "danger-line":
      return "border border-danger text-danger hover:bg-danger hover:text-white";

    case "dark":
      return "bg-dark text-black";
    case "dark-line":
      return "border border-dark text-white hover:bg-dark hover:text-black";

    case "pink":
      return "bg-pink text-white";
    case "pink-line":
      return "border border-pink text-pink hover:bg-pink hover:text-black";

    case "orange":
      return "bg-orange text-white";
    case "orange-line":
      return "border border-orange text-orange hover:bg-orange hover:text-white";

    case "light":
      return "bg-light text-white";
    case "light-line":
      return "border border-white text-white hover:bg-light hover:text-black";

    case "royal-blue":
      return "bg-royalBlue text-white";
    case "royal-blue-line":
      return "border border-royalBlue text-royalBlue hover:bg-royalBlue hover:text-white";

    case "link-button":
      return "underline text-info";
    case "link-button-line":
      return "underline border-info text-info hover:bg-info hover:text-black";

    default:
      return "bg-primary text-white";
  }
};

export type TButtonVariant =
  | "primary"
  | "primary-line"
  | "secondary"
  | "secondary-line"
  | "secondary-line-bordered"
  | "success"
  | "success-line"
  | "info"
  | "info-line"
  | "warning"
  | "warning-line"
  | "danger"
  | "danger-line"
  | "dark"
  | "dark-line"
  | "pink"
  | "pink-line"
  | "orange"
  | "orange-line"
  | "light"
  | "light-line"
  | "royal-blue"
  | "royal-blue-line";

type ButtonProps2 = {
  title?: any;
  children?: ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: TButtonVariant;

  onClick?: (ev: MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
};

// Loading component
export const ButtonLoading: React.FC = () => {
  return (
    <div className="size-full bg-primary-50 opacity-50 absolute top-0 left-0">
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block size-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-loader-circle animate-spin"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
      </span>
    </div>
  );
};

const Button = ({
  children,
  title,
  type = "button",
  variant = "primary",
  onClick,
  className,
  disabled,
  loading,
}: ButtonProps2) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={cn(
        "relative px-3 md:px-5 py-1 md:py-2.5 text-base font-medium rounded-10 transition-colors disabled:bg-primary-100 disabled:pointer-events-none disabled:text-primary-500",
        className,
        cName(variant)
      )}
      disabled={disabled}
    >
      {children || title}

      {loading ? (
        <div className="absolute top-0 left-0 size-full text-primary">
          <ButtonLoading />
        </div>
      ) : null}
    </button>
  );
};

export default Button;
