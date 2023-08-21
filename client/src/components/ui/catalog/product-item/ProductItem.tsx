import { IProduct } from "@/types/product.interface";
import Image from "next/image";
import { FC } from "react";
import FavoriteButton from "./FavoriteButton";
import AddToCartButton from "./AddToCartButton";
import ProductRating from "./ProductRating";
import dynamic from "next/dynamic";
import Link from "next/link";
import { convertPrice } from "@/utils/convert-price";

const DynamicFavoriteButton = dynamic(() => import("./FavoriteButton"), {
  ssr: false,
});

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div>
      <div className="bg-white rounded-xl relative overflow-hidden">
        <div className="absolute top-2 right-3 z-10">
          <DynamicFavoriteButton productId={product.id} />
          <AddToCartButton product={product} />
        </div>
        <Link href={`/product/${product.slug}`}>
          <Image
            width={300}
            height={300}
            src={product.image}
            alt={product.name}
          />
        </Link>
      </div>
      <Link href={`/product/${product.slug}`}>
        <h3 className="mt-2 mb-1 font-semibold">{product.name}</h3>
      </Link>
      <Link href={`/category/${product.category?.slug}`}>
        <div className="text-aqua text-sm mb-2">{product.category?.name}</div>
      </Link>
      <ProductRating product={product} />
      <div className="text-xl font-semibold">{convertPrice(product.price)}</div>
    </div>
  );
};

export default ProductItem;
