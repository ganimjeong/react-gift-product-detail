import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

interface ApiResponse<T> {
  data: T;
}

// queryKey + queryFn
export function useReactQueryFetch<T>(
  queryKey: any[],
  queryFn: () => Promise<ApiResponse<T>>
): UseQueryResult<ApiResponse<T>, Error> {
  return useQuery<ApiResponse<T>, Error>({
    queryKey,
    queryFn,
  });
}
