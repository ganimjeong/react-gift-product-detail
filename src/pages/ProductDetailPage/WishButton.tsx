import styled from '@emotion/styled';
import { Heart } from 'lucide-react';

const WishButton = () => {
  return (
    <WishIcon>
      <StyledHeartIcon />
      <Count>123</Count>
    </WishIcon>
  );
};

export default WishButton;

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
