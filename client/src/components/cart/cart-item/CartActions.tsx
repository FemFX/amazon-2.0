"use client";

import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { ICartItem } from "@/types/cart.interface";
import { FC } from "react";
import { FiMinus, FiPlus, FiTrash } from "react-icons/fi";

export interface ICartActionsProps {
  item: ICartItem;
}
const CartActions: FC<ICartActionsProps> = ({ item }) => {
  const { changeQuantity, removeFromCart } = useActions();

  const { items } = useCart();

  const quantity = items.find((cartItem) => cartItem.id === item.id)?.quantity;
  return (
    <div className="mt-3">
      <div className="flex items-center gap-3">
        <button
          onClick={() => changeQuantity({ id: item.id, type: "minus" })}
          disabled={quantity === 1}
        >
          <FiMinus fontSize={13} />
        </button>

        <input
          disabled
          readOnly
          value={quantity}
          className="w-10 bg-black text-center"
        />

        <button onClick={() => changeQuantity({ id: item.id, type: "plus" })}>
          <FiPlus fontSize={13} />
        </button>
        <button onClick={() => removeFromCart({ id: item.id })}>
          <FiTrash fontSize={13} />
        </button>
      </div>
    </div>
  );
};
export default CartActions;
