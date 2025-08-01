import * as S from './CategorySection.styles';
import CategoryItem from './CategoryItem';
import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import { fetchThemeList } from '@/api/themes';
import type { Category } from '@/api/themes';

const CategorySection = () => {
  const {
    data: response,
    isLoading,
    error,
  } = useReactQueryFetch<{ data: Category[] }>(['themeList'], fetchThemeList);

  const categories = response?.data || [];

  if (isLoading) {
    return (
      <S.Wrapper style={{ justifyContent: 'center', alignItems: 'center', height: '100px' }}>
        <p>테마 불러오는 중...</p>
      </S.Wrapper>
    );
  }

  if (error || categories.length === 0) {
  if (error || categories.length === 0) {
    return null;
  }

  return (
    <>
      <S.Wrapper>
        {categories.map((category) => (
          <CategoryItem
            key={category.themeId}
            themeId={category.themeId}
            name={category.name}
            image={category.image}
          />
        ))}
      </S.Wrapper>
      <S.Banner>
        <p>카카오테크 캠퍼스 3기여러분</p>
        <h3>프론트엔드 2단계 과제 화이팅! 🎉</h3>
      </S.Banner>
    </>
  );
};
}
export default CategorySection;
