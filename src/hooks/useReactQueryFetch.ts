import { useQuery } from '@tanstack/react-query';

interface ApiResponse<T> {
  data: T;
}

export const useReactQueryFetch = <T>(url: string | null) => {
  return useQuery<ApiResponse<T>, Error>({
    queryKey: ['fetch', url],
    queryFn: async () => {
      if (!url) throw new Error('URL이 없습니다.');
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
    enabled: !!url, // url 있을때만
  });
};
