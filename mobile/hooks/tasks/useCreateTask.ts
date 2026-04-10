import { api } from "@/api/axios";
import { useAuth } from "@clerk/expo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = () => {

    const { getToken } = useAuth();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTask: { title: string; description: string, status : string}) => {
            const token = await getToken();
            const { data } = await api.post("/api/tasks", newTask, {
                headers: {
                    Authorization: `Bearer ${token}`
                }

            })

            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        }
    });

}