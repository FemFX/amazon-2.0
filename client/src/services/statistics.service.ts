import { instance } from "@/helpers/api.interceptor";

export const STATISTICS = "statistics";

export type TypeStatisticsResponse = {
  name: string;
  value: number;
}[];

export const StatisticsService = {
  async getMain() {
    return instance<TypeStatisticsResponse>({
      url: `${STATISTICS}`,
      method: "GET",
    });
  },
};
