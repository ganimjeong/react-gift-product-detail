import { useQuery } from '@tanstack/react-query';
import type { UseQueryResult } from '@tanstack/react-query';

interface ApiResponse<T> {
  data: T;
}

// 오버로드 1: URL만 받는 기본 방식
export function useReactQueryFetch<T>(url: string): UseQueryResult<ApiResponse<T>, Error>;

// 오버로드 2: queryKey + queryFn을 직접 넘기는 방식
export function useReactQueryFetch<T>(
  queryKey: any[],
  queryFn: () => Promise<ApiResponse<T>>
): UseQueryResult<ApiResponse<T>, Error>;

export function useReactQueryFetch<T>(
  arg1: string | any[],
  arg2?: () => Promise<ApiResponse<T>>
): UseQueryResult<ApiResponse<T>, Error> {
  // URL 기반 호출
  if (typeof arg1 === 'string') {
    const url = arg1;
    return useQuery<ApiResponse<T>, Error>({
      queryKey: ['fetch', url],
      queryFn: async () => {
        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('존재하지 않는 리소스입니다.');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result && result.data !== undefined) {
          return result;
        } else {
          throw new Error('예상치 못한 응답 구조입니다.');
        }
      },
      enabled: !!url,
    });
  }

  // queryKey + queryFn 기반 호출
  return useQuery<ApiResponse<T>, Error>({
    queryKey: arg1,
    queryFn: arg2!,
  });
}
