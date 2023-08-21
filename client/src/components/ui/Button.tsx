import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import cn from "clsx";

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant: "orange" | "light";
}
const Button: FC<IButtonProps> = ({
  children,
  className,
  variant,
  ...rest
}) => {
  return (
    <button
      {...rest}
      className={cn(className, "rounded-2xl font-semibold shadow px-10 py-2", {
        "text-white bg-primary": variant === "orange",
        "text-primary bg-white": variant === "light",
      })}
    >
      {children}
    </button>
  );
};
export default Button;
