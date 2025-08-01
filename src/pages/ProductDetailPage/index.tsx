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

  const [activeTab, setActiveTab] = useState(0);

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
          {activeTab === 0 && <div>1</div>}
          {activeTab === 1 && <div>2</div>}
          {activeTab === 2 && <div>3</div>}
        </SectionContent>
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
