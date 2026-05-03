import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ORDER_SERVICE_URL = process.env.NEXT_PUBLIC_ORDER_SERVICE_URL || "http://localhost:4003/api/v1/orders";

export const useCustomerOrders = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["customer-orders", page, limit],
    queryFn: async () => {
      const { data } = await axios.get(`${ORDER_SERVICE_URL}/me`, {
        params: { page, limit },
        withCredentials: true,
      });
      return data;
    },
  });
};
