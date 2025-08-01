import { PATH } from '@/constants/paths';
import { useReactQueryFetch } from '@/hooks/useReactQueryFetch';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { fetchThemeInfo } from '@/api/themes';

interface ThemeInfo {
  themeId: number;
  name: string;
  title: string;
  description: string | null;
  backgroundColor: string;
}

//헬퍼함수 - 글자 색 배경밝기에 따라 검정/하양
const getTextColorByBackground = (bgColor: string): string => {
  // hex에서 # 제거 후 RGB 값 추출
  const hex = bgColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // YIQ 알고리즘을 이용한 밝기 계산
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 180 ? '#222' : '#fff'; // 밝으면 어두운 글자, 어두우면 흰 글자
};

const ThemeHero = ({ themeId }: { themeId: string }) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useReactQueryFetch<ThemeInfo>(['themeInfo', themeId], () =>
    fetchThemeInfo(themeId)
  );

  if (error) {
    if (error.message.includes('존재하지 않는 리소스입니다.')) {
      navigate(PATH.ROOT);
      return null;
    }
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  if (isLoading || !data) return <div>로딩 중...</div>;

  const theme = data;
  const textColor = getTextColorByBackground(theme.backgroundColor || '#aaaaaa');

  return (
    <StyledSection backgroundColor={theme.backgroundColor || '#aaaaaa'} textColor={textColor}>
      <h2>{theme.name}</h2>
      <h3>{theme.title}</h3>
      {theme.description && <p>{theme.description}</p>}
    </StyledSection>
  );
};

export default ThemeHero;

const StyledSection = styled.section<{ backgroundColor: string; textColor: string }>`
  padding: 20px;
  text-align: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ textColor }) => textColor};
  h2 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    margin-top: 10px;
  }

  h3 {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 12px;
    opacity: 0.9;
  }

  p {
    font-size: 14px;
    line-height: 1.5;
    opacity: 0.8;
  }
`;
