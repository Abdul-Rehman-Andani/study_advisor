import { api } from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/expo";

export const useTasks = () => {

    const { getToken } = useAuth();

    return useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const token = await getToken();
            const { data } = await api.get("/api/tasks", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data.data;
        }
    })
}




