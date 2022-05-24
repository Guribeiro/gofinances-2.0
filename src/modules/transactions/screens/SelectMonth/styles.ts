import styled from 'styled-components/native';
import { darken } from 'polished';
import { Text } from '@shared/components/Text';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  position: absolute;
  justify-content: flex-end;
  bottom: 0;
  height: 100%;
  width: 100%;
`;

export const Content = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.palett.colors.primary};
`;

export const Body = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.6, true)}px;
  color: ${({ theme }) => theme.palett.colors.white};
  margin-bottom: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const Month = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
  color: ${({ theme }) => theme.palett.colors.white};
  font-family: ${({ theme }) => theme.palett.fonts.regular};
`;

export const Select = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(0.2)}px;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  background: ${({ theme }) => darken(0.02, theme.palett.colors.secondary)};
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;
export const ButtonText = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.white};
`;

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(1.25, true)}px;
  color: ${({ theme }) => theme.palett.colors.white};
`;

export const CloseButton = styled.TouchableOpacity`
  width: 100%;
  height: ${({ theme }) => theme.screen.rem(3.75)}px;
  align-items: center;
  justify-content: center;
`;
