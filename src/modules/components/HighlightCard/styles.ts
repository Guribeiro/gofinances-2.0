import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Text } from '@shared/components/Text';
import { lighten } from 'polished';

type IconProps = {
  color: string;
};

type ContainerProps = {
  background: string;
};

type FontProps = {
  color: string;
};

export const Container = styled.View<ContainerProps>`
  background: ${({ background }) => background};
  width: ${({ theme }) => theme.screen.rem(18.75)}px;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: ${({ theme }) => theme.screen.rem(1.125)}px
    ${({ theme }) => theme.screen.rem(1.5)}px;

  margin-right: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Title = styled(Text)<FontProps>`
  color: ${({ color }) => color};
  font-family: ${({ theme }) => theme.palett.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${({ theme }) => theme.screen.rem(2.5, true)}px;
  color: ${({ color }) => color};
`;

export const Content = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(3.5, true)}px;
`;

export const Amount = styled(Text)<FontProps>`
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
  color: ${({ color }) => color};
`;
export const LastTransaction = styled(Text)<FontProps>`
  font-size: ${({ theme }) => theme.screen.rem(0.75, true)}px;
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  color: ${({ color }) => lighten(0.4, color)};
`;
