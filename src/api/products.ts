import axios from './axiosInstance';

interface ProductSummaryData {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  brandName?: string;
}

export const fetchProductSummary = async (productId: number) => {
  const res = await axios.get<{ data: ProductSummaryData }>(`/products/${productId}/summary`);
  return res.data;
};
