// hooks/courses/useDeleteCourse.ts
import { api } from "@/api/axios";
import { useAuth } from "@clerk/expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    // Move courseId here so it's passed during the actual click
    mutationFn: async (courseId: string) => {
      const token = await getToken();
      await api.delete(`/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};