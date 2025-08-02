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
import ProductTabs from './ProductTabs';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@/constants/paths';

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
  const detailHTML = detailRes?.description;
  const announcements = detailRes?.announcements ?? [];
  const highlightReviews = reviewRes?.reviews ?? [];

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

  const navigate = useNavigate();
  const goToOrderPage = () => {
    navigate(PATH.PRODUCT_DETAIL(id));
  };

  return (
    <Layout>
      <NavigationBar />

      <ErrorBoundary fallback={<div>상품 정보를 불러오지 못했습니다.</div>}>
        <Suspense fallback={<div>상품 상세 로딩 중...</div>}>
          <Container>
            <ProductOverview product={product} />
            <SectionDivider />
            <ProductTabs
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              detailHTML={detailHTML}
              highlightReviews={highlightReviews}
              announcements={announcements}
            />
          </Container>
        </Suspense>
      </ErrorBoundary>

      <WishButton wishCount={wishCount} isWished={isWished} onClick={handleWishToggle} />
      <BottomButton onClick={goToOrderPage}>주문하기</BottomButton>
    </Layout>
  );
};

export default ProductDetailPage;

const Container = styled.div`
  padding-bottom: 72px;
`;
