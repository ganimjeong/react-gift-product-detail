import { useParams } from 'react-router-dom';
import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import { fetchProductSummary } from '@/api/products';
import * as S from './ProductSummary.styles';

const ProductSummary = () => {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id ?? '', 10);

  if (isNaN(productId)) {
    return (
      <S.Wrapper style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>유효하지 않은 상품 ID입니다.</p>
      </S.Wrapper>
    );
  }

  const { data, isLoading, error } = useReactQueryFetch(['productSummary', productId], () =>
    fetchProductSummary(productId)
  );

  const product = data?.data;

  if (isLoading) {
    return (
      <S.Wrapper style={{ textAlign: 'center', padding: '20px' }}>
        <p>상품 정보를 불러오는 중...</p>
      </S.Wrapper>
    );
  }

  if (error) {
    return (
      <S.Wrapper style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
        <p>{error.message}</p>
      </S.Wrapper>
    );
  }

  if (!product) {
    return (
      <S.Wrapper style={{ textAlign: 'center', padding: '20px' }}>
        <p>상품 정보를 찾을 수 없습니다.</p>
      </S.Wrapper>
    );
  }

  return (
    <S.Wrapper>
      <S.Thumbnail src={product.imageURL} alt={product.name} />
      <S.Info>
        <S.Name>{product.name}</S.Name>
        {product.brandName && (
          <S.Brand>
            <span>{product.brandName}</span>
          </S.Brand>
        )}
        <S.Price>{product.price.toLocaleString()}원</S.Price>
      </S.Info>
    </S.Wrapper>
  );
};

export default ProductSummary;
