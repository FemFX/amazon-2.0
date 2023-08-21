import Catalog from "@/components/ui/catalog/Catalog";
import { TypePaginationProducts } from "@/types/product.interface";
import React from "react";

const getData = async (): Promise<TypePaginationProducts> => {
  const res = await fetch(
    `${process.env.API_URL}/product?page=${1}&perPage=${4}`,
    {
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load data");
  }

  return res.json();
};

const Home = async () => {
  const data = await getData();

  return (
    <div>
      <Catalog products={data.products} title="Freshed products" isPagination />
    </div>
  );
};

export default Home;
