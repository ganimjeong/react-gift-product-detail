import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
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
  type WishCountData,
} from '@/api/products';

import WishButton from './WishButton';
import { useEffect, useState } from 'react';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const id = Number(productId);

  const [activeTab, setActiveTab] = useState(0);

  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductInfo(id),
    enabled: !!productId,
  });

  const { data: detailHTML } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => fetchProductDetailHTML(id),
    enabled: !!productId,
  });

  const { data: highlightReview } = useQuery({
    queryKey: ['highlightReview', id],
    queryFn: () => fetchHighlightReview(id),
    enabled: !!productId,
  });

  const { data: wishData } = useQuery<WishCountData>({
    queryKey: ['wishCount', productId],
    queryFn: () => fetchWishCount(Number(productId)),
    enabled: !!productId,
  });

  //위시버튼
  const [wishCount, setWishCount] = useState(0);
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    if (wishData) {
      setWishCount(wishData.wishCount);
      setIsWished(wishData.isWished);
    }
  }, [wishData]);

  const handleWishToggle = () => {
    if (isWished) {
      setWishCount((c) => c - 1);
      setIsWished(false);
    } else {
      setWishCount((c) => c + 1);
      setIsWished(true);
    }

    // 실제 API 콜은 생략하거나 여기서 호출 가능 (성공 여부에 따라 상태 롤백 가능)
  };

  if (isProductLoading || !product) return <div>Loading...</div>;

  return (
    <Layout>
      <NavigationBar />

      <Container>
        <Image src={product.imageURL} alt={product.name} />
        <InfoSection>
          <Brand>{product.brandInfo.name}</Brand>
          <Name>{product.name}</Name>
          <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        </InfoSection>

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
          {activeTab === 0 && <div dangerouslySetInnerHTML={{ __html: detailHTML?.data ?? '' }} />}
          {activeTab === 1 && (
            <div dangerouslySetInnerHTML={{ __html: highlightReview?.data ?? '' }} />
          )}
          {activeTab === 2 && <div>선물정보 탭 (추후 작성)</div>}
        </SectionContent>
      </Container>

      <WishButton wishCount={wishCount} isWished={isWished} onClick={handleWishToggle} />
      <BottomButton>주문하기</BottomButton>
    </Layout>
  );
};

export default ProductDetailPage;

// Styled Components
const Container = styled.div`
  padding: 16px;
  padding-bottom: 72px;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 0px;
  object-fit: cover;
`;

const InfoSection = styled.div`
  margin-top: 16px;
`;

const Brand = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.color.gray600};
`;

const Name = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-top: 4px;
`;

const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
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
