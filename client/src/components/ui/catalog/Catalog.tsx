"use client";

import { IProduct } from "@/types/product.interface";
import { FC } from "react";
import ProductItem from "./product-item/ProductItem";
import Loader from "../Loader";
import Heading from "../Heading";
import Button from "../Button";
import SortDropDown from "./SortDropDown";
import { useState } from "react";
import { EnumProductSort } from "@/services/product/product.type";
import { ProductService } from "@/services/product/product.service";
import { useQuery } from "@tanstack/react-query";

interface ICatalog {
  products: IProduct[];
  isLoading?: boolean;
  title?: string;
  isPagination?: boolean;
}

const Catalog: FC<ICatalog> = ({
  products,
  isLoading,
  title,
  isPagination = false,
}) => {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState<EnumProductSort>(
    EnumProductSort.NEWEST
  );
  const { data, isLoading: loading } = useQuery(
    ["products", sortType, page],
    () =>
      ProductService.getAll({
        page,
        perPage: 4,
        sort: sortType,
      }),
    {
      initialData: {
        products,
        length: products.length,
      },
      keepPreviousData: true,
    }
  );

  if (isLoading) return <Loader />;
  return (
    <section>
      {title && <Heading className="mb-4">{title}</Heading>}
      {isPagination && (
        <SortDropDown sortType={sortType} setSortType={setSortType} />
      )}
      {data.products.length ? (
        <>
          <div className="grid grid-cols-4 gap-10">
            {data.products.map((p) => (
              <ProductItem key={p.id} product={p} />
            ))}
          </div>
          <div className="text-center mt-16">
            {Array.from({ length: data.length / 4 }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <Button
                  key={index}
                  variant={page === pageNumber ? "orange" : "light"}
                  onClick={() => setPage(pageNumber)}
                  className="mx-3"
                >
                  {pageNumber}
                </Button>
              );
            })}
          </div>
          {/* {isPagination && (
          <div className="text-center mt-16">
            <Button variant="orange" onClick={() => setPage(page + 1)}>
              Load more
            </Button>
          </div>
        )} */}
        </>
      ) : (
        <div>There are no products</div>
      )}
    </section>
  );
};

export default Catalog;
