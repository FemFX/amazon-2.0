import { FC, InputHTMLAttributes, forwardRef } from "react";
import { IconType } from "react-icons";
import cn from "clsx";

export interface IInputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  Icon?: IconType;
  error?: string;
}
const InputField = forwardRef<HTMLInputElement, IInputFieldProps>(
  (
    { placeholder, error, type = "text", style, className, Icon, ...rest },
    ref
  ) => {
    return (
      <div className={cn(className, "mb-4")} style={style}>
        <label>
          <span className="block mb-1">
            {Icon && <Icon className="mr-3" />}
            {placeholder}
          </span>
          <input
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={cn(
              "px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition placeholder:font-normal rounded-lg",
              {
                "border-red": !!error,
              }
            )}
            {...rest}
          />
        </label>
        {error && <div className="text-red">{error}</div>}
      </div>
    );
  }
);

InputField.displayName = "Field";
export default InputField;
