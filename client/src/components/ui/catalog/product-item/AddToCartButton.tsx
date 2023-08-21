"use client";

import { useActions } from "@/hooks/useActions";
import { useCart } from "@/hooks/useCart";
import { IProduct } from "@/types/product.interface";
import { FC } from "react";
import { RiShoppingCartFill, RiShoppingCartLine } from "react-icons/ri";

export interface IAddToCartButtonProps {
  product: IProduct;
}

const AddToCartButton: FC<IAddToCartButtonProps> = ({ product }) => {
  const { addToCart, removeFromCart } = useActions();
  const { items } = useCart();

  const currentElement = items.find((cartItem) => cartItem.id === product.id);

  return (
    <div>
      <button
        className="text-primary"
        onClick={() =>
          currentElement
            ? removeFromCart({ id: currentElement.id })
            : addToCart({
                product,
                quantity: 1,
                price: product.price,
              })
        }
      >
        {currentElement ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
      </button>
    </div>
  );
};
export default AddToCartButton;
