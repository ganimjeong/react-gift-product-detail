import axios from './axiosInstance';

//GiftRankingSection
export interface Product {
  id: number;
  name: string;
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

export type TargetType = 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
export type RankType = 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';

export const fetchProductRanking = async (targetType: TargetType, rankType: RankType) => {
  const res = await axios.get<{ data: Product[] }>(
    `/products/ranking?targetType=${targetType}&rankType=${rankType}`
  );
  return res.data;
};

//ProductSummary -> 주문페이지, 제품상세페이지
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
