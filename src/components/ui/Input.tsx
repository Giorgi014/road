import { Eye, EyeOff } from "lucide-react";
import { forwardRef, useState } from "react";
import type { InputConfig, InputProps, InputVariant } from "@/types";

const VARIANT_CONFIG: Record<InputVariant, InputConfig> = {
  name: {
    label: "First Name",
    type: "text",
    placeholder: "Enter your first name...",
    name: "name",
  },
  lastname: {
    label: "Last Name",
    type: "text",
    placeholder: "Enter your last name...",
    name: "lastname",
  },
  email: {
    label: "Email",
    type: "email",
    placeholder: "Enter your email...",
    name: "email",
  },
  password: {
    label: "Password",
    type: "password",
    placeholder: "Enter your password...",
    name: "password",
  },
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant,
      id,
      name,
      type,
      placeholder,
      label,
      containerClassName,
      fieldClassName,
      inputClassName,
      labelClassName,
      className,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const config = VARIANT_CONFIG[variant];
    const inputId = id ?? config.name;
    const isPassword = variant === "password";
    const inputType =
      isPassword && showPassword ? "text" : (type ?? config.type);

    return (
      <div className={containerClassName ?? "space-y-2"}>
        <label
          htmlFor={inputId}
          className={
            labelClassName ??
            "block pl-5 text-[11px] font-medium uppercase tracking-[0.25em] text-white/40"
          }
        >
          {label ?? config.label}
        </label>
        <div
          className={
            fieldClassName ??
            "flex items-center rounded-full border border-ink-400 bg-ink-800/70 backdrop-blur-xl transition-colors focus-within:border-electric-400"
          }
        >
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            name={name ?? config.name}
            placeholder={placeholder ?? config.placeholder}
            className={
              inputClassName ??
              className ??
              "w-full border-none bg-transparent px-5 py-3.5 text-sm text-white outline-none placeholder:text-white/30"
            }
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="mr-1.5 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/40 outline-none transition-colors hover:text-white"
            >
              {showPassword ? (
                <EyeOff size={16} strokeWidth={1.8} />
              ) : (
                <Eye size={16} strokeWidth={1.8} />
              )}
            </button>
          )}
        </div>
      </div>
    );
  },
);
