import { ICartItem } from "./cart.interface";
import { IUser } from "./user.interface";

export enum EnumOrderItemStatus {
  PENDING = "PENDING",
  PAYED = "PAYED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
}

export interface IOrder {
  id: number;
  status: EnumOrderItemStatus;
  createdAt: string;
  items: ICartItem[];
  user: IUser;
  total: number;
}
