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

//ProductSummary (주문페이지 하단)
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

//제품상세페이지

// 상품 정보 API
export const fetchProductInfo = async (productId: number) => {
  const res = await axios.get<{ data: Product }>(`/products/${productId}`);
  return res.data.data;
};

// 상품 상세 설명 API
export const fetchProductDetailHTML = async (productId: number) => {
  const res = await axios.get<{ data: string }>(`/products/${productId}/detail`);
  return res.data;
};

// 주요 리뷰 API
export const fetchHighlightReview = async (productId: number) => {
  const res = await axios.get<{ data: string }>(`/products/${productId}/highlight-review`);
  return res.data;
};

// 관심 등록 수 API
export interface WishCountData {
  wishCount: number;
  isWished: boolean;
}

export const fetchWishCount = async (productId: number): Promise<WishCountData> => {
  const res = await axios.get<{ data: WishCountData }>(`/products/${productId}/wish`);
  return res.data.data;
};
