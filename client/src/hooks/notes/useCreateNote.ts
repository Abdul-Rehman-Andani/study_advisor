import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import api from "../../lib/axios";

export const useCreateNote = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = await getToken();
      const { data } = await api.post("/api/notes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["course", response.data.courseId] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: any) => {
      console.error("Upload Error Details:", error.response?.data || error.message);
    }
  });
};