import * as S from './MyPage.styles';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { PATH } from '@/constants/paths';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const MyPage = () => {
  const { userInfo, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PATH.LOGIN, { replace: true });
  };

  return (
    <Layout>
      <NavigationBar />
      <ErrorBoundary fallback={<div>마이페이지 로딩 오류</div>}>
        <S.Container>
          <S.Title>마이페이지</S.Title>
          <S.UserInfo>
            <strong>로그인한 이메일:</strong> {userInfo?.email}
          </S.UserInfo>
          <S.LogoutButton onClick={handleLogout}>로그아웃</S.LogoutButton>
        </S.Container>
      </ErrorBoundary>
    </Layout>
  );
};

export default MyPage;
