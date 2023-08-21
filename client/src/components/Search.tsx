'use client'

import { useRouter } from "next/navigation";
import { FC, useState } from "react";

export interface ISearchProps {}

const Search: FC<ISearchProps> = ({}) => {
  const [query, setQuery] = useState<string>("");
  const { push } = useRouter();
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => push(`/q?term=${query}`)}>search</button>
    </div>
  );
};
export default Search;
