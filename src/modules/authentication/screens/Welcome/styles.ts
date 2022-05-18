import styled from 'styled-components/native';
import { Text } from '@shared/components/Text';

export const Container = styled.View`
  flex: 1;
`;

export const Body = styled.View`
  flex: 2;
  background: ${({ theme }) => theme.palett.colors.primary};
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(9)}px
    ${({ theme }) => theme.screen.rem(3)}px
    ${({ theme }) => theme.screen.rem(4)}px;
`;

export const Content = styled.View`
  align-items: center;
`;

export const Footer = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.palett.colors.secondary};
  padding: 0 ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const FooterWrapper = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(2.5)}px;
`;

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.875, true)}px;
  text-align: center;
  margin-top: ${({ theme }) => theme.screen.rem(2.5)}px;
`;

export const SigninText = styled(Text)`
  text-align: center;
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  font-family: ${({ theme }) => theme.palett.fonts.regular};
`;
