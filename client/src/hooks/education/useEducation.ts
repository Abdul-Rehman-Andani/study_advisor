import api from "../../lib/axios";
import { useAuth } from "@clerk/clerk-react"
import { useQuery } from "@tanstack/react-query";

export const useEducation = () => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await api.get("/api/education", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data; // Returns null if no record exists in MongoDB
    },
  });
};