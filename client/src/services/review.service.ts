import { instance } from "@/helpers/api.interceptor";
import { IReview } from "../types/review.interface";

export const REVIEW = "review";

type TypeData = {
  rating: number;
  text: string;
};

export const ReviewService = {
  async getAll() {
    return instance<IReview[]>({
      url: REVIEW,
      method: "GET",
    });
  },

  async leave(productId: string | number, data: TypeData) {
    return instance<IReview>({
      url: `${REVIEW}/leave/${productId}`,
      method: "POST",
      data,
    });
  },
  async getAverage(productId: string | number) {
    return instance<number>({
      url: `${REVIEW}/average-by-product/${productId}`,
      method: "Get",
    });
  },
};
