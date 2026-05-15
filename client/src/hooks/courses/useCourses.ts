import api from "../../lib/axios";
import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export const useCourses = () => {
    const { getToken } = useAuth();

    return useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const token = await getToken();
            const { data } = await api.get("/api/courses", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.data;
        }
    });
}