import api from "../../lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export const useNotes = (courseId: string) => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["notes", courseId],
    queryFn: async () => {
      const token = await getToken();
      const { data } = await api.get(`/api/notes/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data.data;
    },
    enabled: !!courseId,
  });
};