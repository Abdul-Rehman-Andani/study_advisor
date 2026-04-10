import { api } from "@/api/axios";
import { useAuth } from "@clerk/expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateEducation = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updates: Partial<{ university: string; program: string; semester: string }>) => {
      const token = await getToken();
      const { data } = await api.patch("/api/education", updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    },
    onSuccess: () => {
      // Refresh the "get" query so the UI updates
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });
};