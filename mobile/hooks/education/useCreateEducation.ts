import { api } from "@/api/axios";
import { useAuth } from "@clerk/expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateEducation = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (educationData: { university: string; program: string; semester: string }) => {
      const token = await getToken();
      const { data } = await api.post("/api/education/create", educationData, {
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