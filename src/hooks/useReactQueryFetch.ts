import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult, UseQueryOptions, QueryKey } from '@tanstack/react-query';

type SuspenseUseQueryOptions<T> = Omit<UseQueryOptions<T, Error, T>, 'queryKey' | 'queryFn'> & {
  suspense?: boolean;
  useErrorBoundary?: boolean;
};

export function useReactQueryFetch<T>(
  queryKey: QueryKey,
  queryFn: () => Promise<T>,
  options: SuspenseUseQueryOptions<T> = {}
): UseQueryResult<T, Error> {
  return useQuery<T, Error, T>({
    queryKey,
    queryFn,
    suspense: true,
    useErrorBoundary: true,
    ...options,
  });
}
