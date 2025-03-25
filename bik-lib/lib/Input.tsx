import React, { RefObject } from "react";

import { cn } from "@/bik-lib/utils/cn";
import { TOnChangeEvent, TOnSelectEvent } from "../types/OnChangeEventType";

type OptionValue = string | number;

export const addOption = (
  id: OptionValue,
  title: OptionValue,
  value: OptionValue
) => ({
  id,
  title,
  value,
});

type TFormData = {
  [key: string]: string | number | string[];
};

type InputProps = {
  label?: string;
  name: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (ev: TOnChangeEvent | TOnSelectEvent) => void;
  formData: TFormData;
  placeholder?: string;
  className?: string;
  optional?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  required?: boolean;
  height?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  rest?: any;
  fontWeight?: string;
  options?: { id: OptionValue; title: OptionValue; value: OptionValue }[];
  [key: string]: any;
};

// Define props for TextareaField
interface TextareaFieldProps {
  label?: string;
  name: string;
  formData: TFormData;
  // eslint-disable-next-line no-unused-vars
  onChange: (ev: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  height?: string;
  className?: string;
  optional?: boolean;
  disabled?: boolean;
  inputRef?: RefObject<HTMLTextAreaElement>;
  required?: boolean;
  [key: string]: any;
}
export const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  name,
  onChange,
  formData,
  placeholder = "",
  height = "h-full",
  className = "",
  optional = false,
  disabled = false,
  inputRef,
  required = false,
  ...rest
}) => {
  return (
    <div className={cn("w-full flex flex-col custom-field", className)}>
      {!!label?.length && (
        <label className="pl-1 mb-1 text-sm md:text-base capitalize h-auto w-full font-normal text-left">
          {label}{" "}
          {optional && required === false && (
            <span className="text-primary-700 text-sm"> (optional)</span>
          )}
          {required && optional === false && (
            <span className="text-error text-base">*</span>
          )}
        </label>
      )}
      <textarea
        ref={inputRef}
        name={name}
        value={formData[name]?.toString().length > 0 ? formData[name] : ""}
        onChange={onChange}
        placeholder={placeholder || label}
        cols={2}
        disabled={disabled}
        autoComplete="off"
        className={cn(
          `flex-shrink w-full bg-transparent rounded-lg block outline-none border border-[#FFFFFF]/10 px-2 py-1.5
           text-[#FFFFFF]/40 text-xs md:text-sm leading-6 font-normal disabled:bg-primary-50 disabled:text-primary-700`,
          height
        )}
        {...rest}
      />
    </div>
  );
};

export const SelectOption = ({
  label,
  name,
  options,
  onChange,
  formData,
  placeholder = "",
  className = "",
  height = "",
  fontWeight = "font-normal",
  optional = false,
  disabled = false,
  required = false,
}: InputProps) => {
  return (
    <div className={cn("flex flex-col w-full custom-field", className)}>
      {!!label?.length && (
        <label
          className={`pl-1 mb-1 text-sm md:text-base capitalize w-full text-[#FFFFFF] text-left ${fontWeight} `}
        >
          {label}{" "}
          {optional && required === false && (
            <span className="text-primary-700 text-sm"> (optional)</span>
          )}
          {required && optional === false && (
            <span className="text-error text-base">*</span>
          )}
        </label>
      )}
      <select
        onChange={onChange}
        name={name}
        value={formData[name] || ""}
        className={cn(
          `form-selected dropdown w-full h-8.5 md:h-10 bg-transparent rounded-lg outline-none border border-[#FFFFFF]/10 px-2
           text-[#FFFFFF]/40 text-xs md:text-sm leading-6 font-normal capitalize disabled:bg-primary-50 
           disabled:text-primary-700 disabled:pointer-events-none`,
          height
        )}
        disabled={disabled}
      >
        <option value="">Select {placeholder || label} </option>
        {options?.map((option) => (
          <option key={option?.id} value={option?.value} className="capitalize">
            {option?.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export const InputField = ({
  label = "",
  name,
  onChange,
  formData,
  placeholder = "",
  className = "",
  optional = false,
  disabled = false,
  readOnly = false,
  type = "text",
  required = false,
  height = "",
  ...rest
}: InputProps) => {
  return (
    <div className={cn("flex flex-col w-full custom-field", className)}>
      {!!label?.length && (
        <label className="pl-1 mb-1 text-sm md:text-base capitalize w-full font-normal text-left">
          {label}{" "}
          {optional && required === false && (
            <span className="text-primary-700 text-sm"> (optional)</span>
          )}
          {required && optional === false && (
            <span className="text-error text-base">*</span>
          )}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={onChange}
        placeholder={placeholder || label}
        disabled={disabled}
        readOnly={readOnly}
        autoComplete="off"
        className={cn(
          `flex-shrink w-full h-8.5 md:h-10 bg-transparent rounded-lg block outline-none border border-[#FFFFFF]/10 
           px-2 text-[#FFFFFF]/40 text-xs md:text-sm leading-6 font-normal disabled:bg-primary-50 disabled:text-primary-700 
           read-only:border-primary-100 read-only:bg-primary-50/50 read-only:text-primary-700 read-only:cursor-default`,
          height
        )}
        {...rest}
      />
    </div>
  );
};

export const InputDate = ({
  label,
  name,
  onChange,
  formData,
  placeholder = "",
  className = "",
  optional = false,
  disabled = false,
  required = false,
  type = "date",
  height = "",
  ...rest
}: InputProps) => {
  return (
    <div className={cn("flex flex-col w-full custom-field", className)}>
      {!!label?.length && (
        <label className="pl-1 mb-1 text-sm md:text-base text-[#FFFFFF] capitalize w-full font-normal text-left">
          {label}{" "}
          {optional && required === false && (
            <span className="text-[#FFFFFF] text-sm"> (optional)</span>
          )}
          {required && optional === false && (
            <span className="text-[#FFFFFF] text-base">*</span>
          )}
        </label>
      )}
      <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={onChange}
        placeholder={placeholder || label}
        disabled={disabled}
        autoComplete="off"
        className={cn(
          `custom-date-input flex-shrink w-full h-8.5 md:h-10 bg-transparent rounded-lg block outline-none border border-[#FFFFFF]/10 
          px-2 text-[#FFFFFF]/40 text-xs md:text-sm leading-6 font-normal disabled:bg-primary-50 disabled:text-primary-700`,
          height
        )}
        {...rest}
      />
    </div>
  );
};
