import api  from "../../lib/axios";
import { useAuth } from '@clerk/clerk-react'  
import { useQuery } from "@tanstack/react-query";

export const usePlans = () => {
    const { getToken } = useAuth();
    
    return useQuery({
        queryKey: ['plans'],
        queryFn: async () => {
            const token = await getToken();
            const { data } = await api.get(`/api/plans`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Transform the strings back into Date objects for the Calendar component
            return data.data.map((plan: any) => ({
                ...plan,
                start: new Date(plan.start),
                end: new Date(plan.end),
            }));
        },
    });
};