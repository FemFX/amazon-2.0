import { instance } from "@/helpers/api.interceptor";
import { ICategory } from "@/types/category.interface";

export const CATEGORY = "category";

export const CategoryService = {
  async getAll() {
    return instance<ICategory[]>({
      url: CATEGORY,
      method: "GET",
    });
  },
  async getById(id: string | number) {
    return instance<ICategory>({
      url: `${CATEGORY}/${id}`,
      method: "GET",
    });
  },
  async getBySlug(slug: string) {
    return instance<ICategory>({
      url: `${CATEGORY}/by-slug/${slug}`,
      method: "GET",
    });
  },
  async create() {
    return instance<ICategory>({
      url: CATEGORY,
      method: "POST",
    });
  },
  async update(id: string | number, name: string) {
    return instance<ICategory>({
      url: `${CATEGORY}/${id}`,
      method: "PUT",
      data: { name },
    });
  },
  async delete(id: string | number, name: string) {
    return instance({
      url: `${CATEGORY}/${id}`,
      method: "DELETE",
    });
  },
};
