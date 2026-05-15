import api  from "../../lib/axios";
import { useAuth } from '@clerk/clerk-react'  
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