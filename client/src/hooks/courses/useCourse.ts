import  api  from "../../lib/axios"
import { useAuth } from '@clerk/clerk-react'  // ← only change
import { useQuery } from '@tanstack/react-query'

export const useCourse = (id: string) => {
  const { getToken } = useAuth()

  return useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const token = await getToken()

      const { data } = await api.get(`/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      return data.data
    },
    enabled: !!id,
  })
}