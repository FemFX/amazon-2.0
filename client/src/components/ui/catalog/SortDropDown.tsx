import { EnumProductSort } from "@/services/product/product.type";
import { Dispatch, FC, SetStateAction } from "react";

export interface ISortDropdownProps {
  sortType: EnumProductSort;
  setSortType: Dispatch<SetStateAction<EnumProductSort>>;
}

const SortDropDown: FC<ISortDropdownProps> = ({ sortType, setSortType }) => {
  return (
    <div className="text-right mb-5">
      <select
        value={sortType}
        onChange={(e) => setSortType(e.target.value as any)}
        className="appearance-none  py-1 px-2 bg-white"
      >
        {(
          Object.keys(EnumProductSort) as Array<keyof typeof EnumProductSort>
        ).map((key) => {
          return (
            <option
              key={EnumProductSort[key]}
              value={EnumProductSort[key]}
              onChange={() => setSortType(EnumProductSort[key])}
              //   selected={sortType === EnumProductSort[key]}
            >
              {EnumProductSort[key]}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default SortDropDown;
