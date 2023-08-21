import { IProduct } from "@/types/product.interface";

export type TypeProductData = {
  name: string;
  price: number;
  description?: string;
  image: string;
  categoryId: number;
};
export enum EnumProductSort {
  HIGH_PRICE = "high-price",
  LOW_PRICE = "low-price",
  NEWEST = "newest",
  OLDEST = "oldest",
}
export type TypeProductDataFilters = {
  sort?: EnumProductSort;
  searchTerm?: string;
  page?: string | number;
  perPage?: string | number;
};
