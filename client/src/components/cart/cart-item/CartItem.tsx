"use client";

import { ICartItem } from "@/types/cart.interface";
import { FC } from "react";
import Image from "next/image";
import { convertPrice } from "@/utils/convert-price";
import CartActions from "./CartActions";

export interface ICartItemProps {
  item: ICartItem;
}
const CartItem: FC<ICartItemProps> = ({ item }) => {
  return (
    <div>
      <Image
        src={item.product.image}
        width={100}
        height={100}
        alt={item.product.name}
      />
      <div>
        <div>{item.product.name}</div>
        <div>{convertPrice(item.price)}</div>

        <CartActions item={item} />
      </div>
    </div>
  );
};
export default CartItem;
