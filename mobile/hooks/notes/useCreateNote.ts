import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/expo";
import { api } from "@/api/axios";

export const useCreateNote = () => {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: FormData) => {
      const token = await getToken();
      const { data } = await api.post("/api/notes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Try adding it back ONLY if the previous way failed
          // DO NOT set Content-Type here. Axios will handle it.
        },
      });
      return data;
    },
    onSuccess: (response) => {
      // Refresh the specific course to show the new note immediately
      queryClient.invalidateQueries({ queryKey: ["course", response.data.courseId] });
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (error: any) => {
      console.error("Upload Error Details:", error.response?.data || error.message);
    }
  });
};