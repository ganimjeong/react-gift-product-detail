import styled from '@emotion/styled';
import type { Product } from '@/api/products';

interface Props {
  product: Product;
}

const ProductOverview = ({ product }: Props) => {
  return (
    <>
      <Image src={product.imageURL} alt={product.name} />
      <InfoSection>
        <Brand>{product.brandInfo.name}</Brand>
        <Name>{product.name}</Name>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
      </InfoSection>
    </>
  );
};

export default ProductOverview;

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
