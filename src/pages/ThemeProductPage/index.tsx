import { useParams } from 'react-router-dom';
import ThemeHero from './ThemeHero';
import ThemeProductList from './ThemeProductList';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Suspense } from 'react';

const ThemeProductPage = () => {
  const { themeId } = useParams<{ themeId: string }>();

  if (!themeId) return null;

  return (
    <ErrorBoundary fallback={<div>테마 페이지를 불러올 수 없습니다.</div>}>
      <Suspense fallback={<div>로딩 중...</div>}>
        <ThemeHero themeId={themeId} />
        <ThemeProductList themeId={themeId} />
      </Suspense>
    </ErrorBoundary>
  );
};

export default ThemeProductPage;
