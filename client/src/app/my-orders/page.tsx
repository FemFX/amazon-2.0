"use client";

import Heading from "@/components/ui/Heading";
import { OrderService } from "@/services/order.service";
import { convertPrice } from "@/utils/convert-price";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const Page = () => {
  const { data: orders } = useQuery(
    ["my orders"],
    () => OrderService.getAll(),
    {
      select: ({ data }) => data,
    }
  );
  return (
    <section>
      <Heading>My orders</Heading>
      {orders?.length ? (
        orders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow flex gap-10 p-7 my-7 rounded-lg"
          >
            <span>#{order.id}</span>
            <span>{order.status}</span>
            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
            <span>{convertPrice(order.total)}</span>
          </div>
        ))
      ) : (
        <div>Orders not found</div>
      )}
    </section>
  );
};

export default Page;
