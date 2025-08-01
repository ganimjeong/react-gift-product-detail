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

  return (
    <Layout>
      <NavigationBar />

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

      <WishButton wishCount={wishCount} isWished={isWished} onClick={handleWishToggle} />
      <BottomButton>주문하기</BottomButton>
    </Layout>
  );
};

export default ProductDetailPage;

const Container = styled.div`
  padding-bottom: 72px;
`;
