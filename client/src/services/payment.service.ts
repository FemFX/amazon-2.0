import { instance } from "@/helpers/api.interceptor";
import { IPaymentResponse } from "../types/payment.interface";

export const PAYMENT = "payment";

export const PaymentService = {
  async createPayment(amount: number) {
    return instance.post<IPaymentResponse>(PAYMENT, { amount });
  },
};
