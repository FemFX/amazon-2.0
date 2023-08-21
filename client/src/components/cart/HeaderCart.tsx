"use client";

import { useCart } from "@/hooks/useCart";
import { useOutside } from "@/hooks/useOutside";
import { PaymentService } from "@/services/payment.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";
import { RiShoppingCartFill } from "react-icons/ri";
import cn from "clsx";
import styles from "./Cart.module.scss";
import { convertPrice } from "@/utils/convert-price";
import CartItem from "./cart-item/CartItem";
import Button from "../ui/Button";
import { OrderService } from "@/services/order.service";
import { useActions } from "@/hooks/useActions";

export interface IHeaderCartProps {}
const HeaderCart: FC<IHeaderCartProps> = ({}) => {
  const { isShow, setIsShow, ref } = useOutside(false);
  const { items, total } = useCart();
  const { reset } = useActions();

  const { push } = useRouter();

  const { mutate } = useMutation(
    ["create order and payment"],
    () =>
      OrderService.place({
        items: items.map((item) => ({
          price: item.price,
          quantity: item.quantity,
          productId: item.product.id,
        })),
      }),
    {
      onSuccess({ data }) {
        push(data.confirmation.confirmation_url);
        reset();
      },
    }
  );

  return (
    <div className="relative" ref={ref}>
      <RiShoppingCartFill
        size={30}
        onClick={() => {
          setIsShow(!isShow);
        }}
      />
      {/* <SquareButton
        Icon={RiShoppingCartFill}
        onClick={() => {
          setIsShow(!isShow);
        }}
        number={items.length}
      /> */}
      <div
        className={cn(
          "absolute top-[4.2rem] w-80 -left-[12.5rem] bg-secondary rounded-xl px-5 py-3 text-sm menu z-20 text-white",
          isShow ? "open-menu" : "close-menu"
        )}
      >
        <div className="font-normal text-lg mb-5">My cart</div>
        <div className={styles.cart}>
          {items.length ? (
            items.map((item) => <CartItem key={item.id} item={item} />)
          ) : (
            <div className="font-light">Cart is empty</div>
          )}
        </div>
        <div className={styles.footer}>
          <div>Total:</div>
          <div>{convertPrice(total)}</div>
        </div>
        <div className="text-center">
          <Button
            variant="light"
            className="btn-link mt-5 mb-2"
            onClick={() => mutate()}
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  );
};
export default HeaderCart;
