import { api } from "@/api/axios";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query";

export const useNotes = (courseId: string) => {
  const { getToken } = useAuth();

  // MUST return the result of useQuery
  return useQuery({
    queryKey: ["notes", courseId], // Unique key for this course's notes
    queryFn: async () => {
      const token = await getToken();
      // Adjust this URL to match your backend notes route
      const { data } = await api.get(`/api/notes/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data; // Assuming your backend returns { success: true, data: [...] }
    },
    enabled: !!courseId, // Only fetch if we have an ID
  });
};