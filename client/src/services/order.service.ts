import { instance } from "@/helpers/api.interceptor";
import { IOrder } from "../types/order.interface";
import { ICartItem } from "@/types/cart.interface";

export const ORDER = "order";

enum EnumOrderStatus {
  PENDING = "PENDING",
  PAYED = "PAYED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

type TypeData = {
  status?: EnumOrderStatus;
  items: Array<{ productId: number; quantity: number; price: number }>;
};

export const OrderService = {
  async getAll() {
    return instance<IOrder[]>({
      url: `${ORDER}/by-user`,
      method: "GET",
    });
  },
  async place(data: TypeData) {
    return instance<{ confirmation: { confirmation_url: string } }>({
      url: ORDER,
      method: "POST",
      data,
    });
  },
};
