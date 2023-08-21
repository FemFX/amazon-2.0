"use client";

import { IProduct, IProductDetails } from "@/types/product.interface";
import { FC, useState } from "react";
import { Rating } from "react-simple-star-rating";

const ProductRating: FC<{ product: IProduct }> = ({ product }) => {
  const [rating, setRating] = useState(
    Math.round(
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
        product.reviews.length
    ) || 0
  );
  return (
    <div className="mb-2">
      <span className="flex items-center mr-1">
        <Rating
          readonly
          initialValue={rating}
          SVGstyle={{
            display: "inline-block",
          }}
          size={34}
          allowFraction
          transition
        />
        <span className="text-primary text-sm ml-1">{rating}</span>
      </span>
      <span className="text-xs">({product.reviews.length}) reviews</span>
    </div>
  );
};
export default ProductRating;
