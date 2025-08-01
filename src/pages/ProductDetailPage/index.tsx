import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import BottomButton from '@/components/BottomButton';
import SectionDivider from '@/components/SectionDivider';
import styled from '@emotion/styled';
import { fetchProductSummary } from '@/api/products';
import { Heart } from 'lucide-react';

interface ProductSummaryData {
  id: number;
  name: string;
  price: number;
  imageURL: string;
  brandName?: string;
}

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState<ProductSummaryData | null>(null);

  useEffect(() => {
    if (!productId) return;
    fetchProductSummary(Number(productId)).then((res) => setProduct(res.data));
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  return (
    <Layout>
      <NavigationBar />

      <Container>
        <Image src={product.imageURL} alt={product.name} />
        <InfoSection>
          <Brand>{product.brandName}</Brand>
          <Name>{product.name}</Name>
          <Price>{product.price.toLocaleString()}원</Price>
        </InfoSection>

        <SectionDivider />

        <TabNav>
          <Tab>상품설명</Tab>
          <Tab>상세보기</Tab>
          <Tab>선물정보</Tab>
        </TabNav>

        <SectionContent>TODO : 탭에 맞는 내용은 추후 구현 예정</SectionContent>
      </Container>

      <WishIcon>
        <StyledHeartIcon />
        <Count>123</Count>
      </WishIcon>
      <BottomButton>주문하기</BottomButton>
    </Layout>
  );
};

export default ProductDetailPage;

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

const Tab = styled.button`
  background: none;
  border: none;
  padding: 12px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  color: ${({ theme }) => theme.color.gray700};

  &:hover {
    color: ${({ theme }) => theme.color.text.default};
  }
`;

const SectionContent = styled.div`
  min-height: 200px;
  border-radius: 8px;
  padding: 16px;
`;

const WishIcon = styled.button`
  position: fixed;
  bottom: 72px;
  left: 16px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  cursor: pointer;
  padding: 4px 0;
`;

const StyledHeartIcon = styled(Heart)`
  color: ${({ theme }) => theme.color.gray600};
  width: 18px;
  height: 18px;
`;

const Count = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.color.gray600};
  line-height: 1;
`;
