import { api } from "@/api/axios";
import { useAuth } from "@clerk/expo";
import { useQuery } from "@tanstack/react-query"

export const useTotalStats = () => {

    const { getToken } = useAuth();

    return useQuery({
        queryKey: ['stats'],
        queryFn: async () => {
            const token = await getToken();
            const { data } = await api.get(`/api/stats/total`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            return data.data;
        }
    });
}