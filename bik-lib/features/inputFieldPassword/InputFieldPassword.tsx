import { TInputChangeEvent } from "@/bik-lib/types/event";
import { cn } from "@/bik-lib/utils/cn";
import iconCopy from "./icons/icon-copy.svg";
import iconTick from "./icons/icon-tick.svg";
import iconAlert from "./icons/icon-alert-red.svg";
import Image from "next/image";
import { FC, useState } from "react";
import Copy from "@/bik-lib/utils/Copy";
import { isValidPassword } from "./PasswordValidation";
import iconCp from "./icons/icon-cPanel.svg";
import iconUser from "./icons/icon-user.svg";
import iconEmail from "./icons/icon-email.svg";

const passwordTypeIcons: {
  [key: string]: string;
} = {
  account: iconUser,
  cp: iconCp,
  email: iconEmail,
};

type TPassword = "account" | "cp" | "email";

type TInputFieldProps = {
  label: any;
  type?: string;
  placeholder?: string;
  name: string;
  formData: Record<string, any>;
  onChange: (e: TInputChangeEvent | any) => void;
  className?: string;
  disabled?: boolean;
  generatePassword?: () => void;
  description?: boolean;
  passwordType?: TPassword;
};
// This is Input Field component with generate Password button and Copy button
export const InputFieldPassword: FC<TInputFieldProps> = ({
  label,
  placeholder = "",
  name,
  type,
  formData,
  onChange,
  className = "",
  disabled = false,
  generatePassword,
  description,
  passwordType,
}) => {
  const { copy, isCopied } = Copy();
  const [showPassword, setShowPassword] = useState(isCopied ? true : false);

  const valid = isValidPassword(formData[name]);

  return (
    <div>
      <label className="text-base font-medium text-primary">{label}</label>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-full h-[45px] relative">
          {/* Show when password type specified */}
          {passwordType && passwordType.length > 0 && (
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <div className="w-7">
                <Image
                  src={passwordTypeIcons[passwordType]}
                  alt={passwordType}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto"
                />
              </div>
            </div>
          )}
          <input
            type={showPassword ? "text" : type}
            name={name}
            value={formData[name] || ""}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            className={cn(
              "block w-full h-full px-2.5 border rounded-[8px] text-base outline-none disabled:grayscale pr-12",
              className,
              {
                "pl-11": passwordType && passwordType.length > 0,
              }
            )}
          />
          {/* Container for buttons */}
          <div className="absolute top-1/2 right-2 flex items-center space-x-2 transform -translate-y-1/2">
            {formData[name] !== "" ? (
              <>
                <button
                  type="button"
                  tabIndex={-1}
                  onClick={() => setShowPassword((st) => !st)}
                  className="h-4 w-4 text-primary-700 select-none outline-none focus:outline-none opacity-70"
                >
                  <Image
                    src={
                      showPassword
                        ? "https://files.bikiran.com/assets/images/icon/icon-pass-show.svg"
                        : "https://files.bikiran.com/assets/images/icon/icon-pass-hide.svg"
                    }
                    alt="eye"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </button>
                <button
                  type="button"
                  onClick={() => copy(formData[name] || "")}
                  className="h-4 w-4 text-primary-700 opacity-70"
                >
                  <Image
                    alt="copy"
                    src={isCopied ? iconTick : iconCopy}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto"
                  />
                </button>
              </>
            ) : null}
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            if (generatePassword) {
              generatePassword();
              setShowPassword(true);
            }
          }}
          className="size-[45px] relative group flex-shrink-0"
        >
          <Image
            alt="generate"
            src={
              "https://files.bikiran.com/assets/images/icon/icon-generate-inactive.svg"
            }
            width={0}
            height={0}
            className="size-full group-hover:hidden"
          />
          <Image
            alt="generate"
            src={
              "https://files.bikiran.com/assets/images/icon/icon-re-generate.svg"
            }
            width={0}
            height={0}
            className="size-full hidden group-hover:block"
          />
        </button>
      </div>
      {description === true ? (
        <div
          className={`flex items-start gap-1 mt-2 `}
        >
          <Image
            src={valid ? iconTick : iconAlert}
            alt="Error"
            width={0}
            height={0}
            className="w-4 h-4 mt-[3px]"
          />
          <span className={`text-sm  ${valid ? "text-green-600" : "text-red-600"}`}>Your Password should contain at least one uppercase letter, one
            lowercase letter, one digit and one special character.</span>
        </div>
      ) : null}
    </div>
  );
};
