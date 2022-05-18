import styled, { css } from 'styled-components/native';
import { Text } from '@shared/components/Text';

type SocialSigninWrapperProps = {
  platform: 'ios' | 'android' | 'windows' | 'macos' | 'web';
};

export const Container = styled.View`
  flex: 1;
`;

export const Body = styled.View`
  flex: 2;
  height: 100%;
  background: ${({ theme }) => theme.palett.colors.primary};
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const Content = styled.View`
  align-items: center;
`;

export const Footer = styled.View`
  width: 100%;
  margin-top: ${({ theme }) => theme.screen.rem(6)}px;
`;

export const FooterWrapper = styled.View`
  width: 100%;
`;

export const SocialSigninContainer = styled.View`
  width: 100%;
`;

export const SocialSigninLabel = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(0.75, true)}px;
  margin-bottom: ${({ theme }) => theme.screen.rem(0.5)}px;
`;

export const SocialSigninWrapper = styled.View<SocialSigninWrapperProps>`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${({ platform }) =>
    platform === 'ios'
      ? css`
          width: 48%;
        `
      : css`
          width: 100%;
        `}
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

export const SeparatorContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

export const SeparatorText = styled(Text)`
  text-align: center;
  font-size: ${({ theme }) => theme.screen.rem(0.75, true)}px;
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  margin: 0 ${({ theme }) => theme.screen.rem(0.75)}px;
`;

export const SeparatorLine = styled.View`
  flex: 1;
  height: 0.5px;
  background: ${({ theme }) => theme.palett.colors.text};
`;

export const Form = styled.View`
  width: 100%;
`;

export const ForgotPasswordContainer = styled.View`
  align-items: flex-end;
`;

export const ForgotPasswordButtonText = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(0.625, true)}px;
  font-family: ${({ theme }) => theme.palett.fonts.medium};
`;

export const CreateNewAccountText = styled(Text)`
  font-family: ${({ theme }) => theme.palett.fonts.regular};

  text-align: center;
`;
