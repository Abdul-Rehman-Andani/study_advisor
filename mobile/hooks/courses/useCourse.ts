import { api } from "@/api/axios";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";

export const useCourse = (id: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["course", id], 
    queryFn: async () => {
      const token = await getToken();
      
      const { data } = await api.get(`/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return data.data;
    },
    // 4. Optimization: Don't run the query if there is no ID
    enabled: !!id, 
  });
};