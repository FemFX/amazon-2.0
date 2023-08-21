"use client";

import Catalog from "@/components/ui/catalog/Catalog";
import { ProductService } from "@/services/product/product.service";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useSearchParams } from "next/navigation";

const SearchPage: NextPage = () => {
  const query = useSearchParams().get("term");
  console.log(query);

  const { data } = useQuery(["search products", query], () =>
    ProductService.getAll({
      searchTerm: query as string,
    })
  );
  return (
    <>
      <Catalog
        title={`Поиск по запросу "${query || ""}"`}
        products={data?.products || []}
      />
    </>
  );
};
export default SearchPage;
