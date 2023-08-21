import { instance } from "@/helpers/api.interceptor";
import { TypeProductData, TypeProductDataFilters } from "./product.type";
import { IProduct, TypePaginationProducts } from "@/types/product.interface";

export const PRODUCT = "product";

export const ProductService = {
  async getAll(queryData = {} as TypeProductDataFilters) {
    const { data } = await instance<TypePaginationProducts>({
      url: PRODUCT,
      method: "GET",
      params: queryData,
    });
    return data;
  },
  async getSimilar(productId: string | number) {
    return instance<IProduct[]>({
      url: `${PRODUCT}/similar/${productId}`,
      method: "GET",
    });
  },
  async getById(id: string | number) {
    return instance<IProduct>({
      url: `${PRODUCT}/${id}`,
      method: "GET",
    });
  },
  async getBySlug(slug: string) {
    return instance<IProduct>({
      url: `${PRODUCT}/by-slug/${slug}`,
      method: "GET",
    });
  },
  async getByCategory(categorySlug: string) {
    return instance<IProduct[]>({
      url: `${PRODUCT}/by-category/${categorySlug}`,
      method: "GET",
    });
  },
  async create() {
    return instance<IProduct>({
      url: PRODUCT,
      method: "POST",
    });
  },
  async update(id: string | number, data: TypeProductData) {
    return instance<IProduct>({
      url: `${PRODUCT}/${id}`,
      method: "PUT",
      data,
    });
  },
  async delete(id: string | number) {
    return instance({
      url: `${PRODUCT}/${id}`,
      method: "DELETE",
    });
  },
};
