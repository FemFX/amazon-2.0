import { instance } from "@/helpers/api.interceptor";
import { ICategory } from "@/types/category.interface";
import { IFullUser, IUser } from "../types/user.interface";

export const USER = "user";

type TypeData = {
  email: string;
  password?: string;
  name?: string;
  avatarPath?: string;
  phone?: string;
};

export const UserService = {
  async getProfile() {
    return instance<IFullUser>({
      url: `${USER}/profile`,
      method: "GET",
    });
  },

  async updateProfile(data: TypeData) {
    return instance<IUser>({
      url: `${USER}/profile`,
      method: "PUT",
      data,
    });
  },
  async toggleFavorite(productId: string | number) {
    return instance<string>({
      url: `${USER}/profile/favorites/${productId}`,
      method: "PATCH",
    });
  },
};
