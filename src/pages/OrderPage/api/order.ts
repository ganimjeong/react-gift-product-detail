import { PATH } from '@/constants/paths';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

interface OrderData {
  [key: string]: any;
}

const createOrder = async ({ data, authToken }: { data: OrderData; authToken: string }) => {
  const response = await axios.post('http://localhost:3000/api/order', data, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

interface UseCreateOrderOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  authToken: string;
}

export const useCreateOrder = ({ onSuccess, onError, authToken }: UseCreateOrderOptions) => {
  return useMutation({
    mutationFn: (data: OrderData) => createOrder({ data, authToken }),
    onSuccess,
    onError: (error: unknown) => {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        window.location.href = PATH.LOGIN;
      } else {
        onError?.(axiosError);
      }
    },
  });
};
