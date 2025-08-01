import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Layout from '@/components/Layout';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import BottomButton from '@/components/BottomButton';
import SectionDivider from '@/components/SectionDivider';
import {
  fetchProductInfo,
  fetchProductDetailHTML,
  fetchHighlightReview,
  fetchWishCount,
} from '@/api/products';
import WishButton from './WishButton';
import { useEffect, useState } from 'react';
import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import ProductOverview from './ProductOverview';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const id = Number(productId);

  const [activeTab, setActiveTab] = useState(0);

  const { data: productRes, isLoading: isProductLoading } = useReactQueryFetch(
    ['product', id],
    () => fetchProductInfo(id)
  );

  const { data: detailRes } = useReactQueryFetch(['productDetail', id], () =>
    fetchProductDetailHTML(id)
  );

  const { data: reviewRes } = useReactQueryFetch(['highlightReview', id], () =>
    fetchHighlightReview(id)
  );

  const { data: wishRes } = useReactQueryFetch(['wishCount', id], () => fetchWishCount(id));

  const product = productRes;
  const detailHTML = detailRes?.data;
  const highlightReview = reviewRes?.data;

  const [wishCount, setWishCount] = useState(0);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    if (wishRes) {
      setWishCount(wishRes.wishCount);
      setIsWished(wishRes.isWished);
    }
  }, [wishRes]);

  const handleWishToggle = () => {
    setIsWished((prev) => !prev);
    setWishCount((prev) => prev + (isWished ? -1 : 1));
    // 토글 API 위치
  };

  if (isProductLoading || !product) return <div>Loading...</div>;

  return (
    <Layout>
      <NavigationBar />

      <Container>
        <ProductOverview product={product} />

        <SectionDivider />

        <TabNav>
          <Tab onClick={() => setActiveTab(0)} isActive={activeTab === 0}>
            상품설명
          </Tab>
          <Tab onClick={() => setActiveTab(1)} isActive={activeTab === 1}>
            상세보기
          </Tab>
          <Tab onClick={() => setActiveTab(2)} isActive={activeTab === 2}>
            선물정보
          </Tab>
        </TabNav>

        <SectionContent>
          {activeTab === 0 && <div dangerouslySetInnerHTML={{ __html: detailHTML ?? '' }} />}
          {activeTab === 1 && <div dangerouslySetInnerHTML={{ __html: highlightReview ?? '' }} />}
          {activeTab === 2 && <div>선물정보 탭 (추후 작성)</div>}
        </SectionContent>
      </Container>

      <WishButton wishCount={wishCount} isWished={isWished} onClick={handleWishToggle} />
      <BottomButton>주문하기</BottomButton>
    </Layout>
  );
};

export default ProductDetailPage;

const Container = styled.div`
  padding: 16px;
  padding-bottom: 72px;
`;

const TabNav = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 17px 83px;
  background-color: white;
  color: ${({ isActive, theme }) => (isActive ? theme.color.text.default : theme.color.gray600)};
  border: none;
  border-bottom: ${({ isActive, theme }) =>
    isActive ? `2px solid ${theme.color.text.default}` : '2px solid transparent'};
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }
`;

const SectionContent = styled.div`
  min-height: 200px;
  border-radius: 8px;
  padding: 16px;
`;
