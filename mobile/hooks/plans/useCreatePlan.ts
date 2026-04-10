import { api } from "@/api/axios";
import { useAuth } from "@clerk/expo";
import {  useMutation, useQueryClient } from "@tanstack/react-query"


export const useCreatePlan = () => {
    const queryClient = useQueryClient();
    const { getToken } = useAuth();

    return useMutation({
        mutationFn: async (newPlan: any) => {
            const token = await getToken();
            const { data } = await api.post(`/api/plans`, newPlan, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['plans'] });
        }
    });
}