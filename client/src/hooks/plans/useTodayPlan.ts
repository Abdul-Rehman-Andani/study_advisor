import api  from "../../lib/axios";
import { useAuth } from '@clerk/clerk-react'  
import { useQuery } from "@tanstack/react-query";

export const useTodayPlans = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["plans", "today"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await api.get(`/api/plans/today`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.data;
    },
  });
};