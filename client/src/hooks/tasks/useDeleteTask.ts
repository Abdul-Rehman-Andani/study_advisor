import  api  from "../../lib/axios";
import { useAuth } from '@clerk/clerk-react'  // ← only change

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  // You MUST use useMutation here
  return useMutation({
    mutationFn: async (id: string) => {
      const token = await getToken();
      const { data } = await api.delete(`/api/tasks/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data.data;
    },
    onSuccess: () => {
      // This refreshes your 'tasks' list automatically
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

