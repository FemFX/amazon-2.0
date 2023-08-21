import { FC, ReactNode } from "react";
import cn from "clsx";

export interface IHeadingProps {
  children: ReactNode;
  className?: string;
}
const Heading: FC<IHeadingProps> = ({ children, className }) => {
  return (
    <h1 className={cn(className, "font-semibold text-3xl")}>{children}</h1>
  );
};
export default Heading;
