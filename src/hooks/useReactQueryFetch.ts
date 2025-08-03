import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

export function useReactQueryFetch<T>(
  queryKey: any[],
  queryFn: () => Promise<T>,
  options = {}
): UseQueryResult<T, Error> {
  return useQuery<T, Error>({
    queryKey,
    queryFn,
    ...options,
  });
}
