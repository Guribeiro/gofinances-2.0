import styled from 'styled-components/native';
import { Text } from '@shared/components/Text';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  background: ${({ theme }) => theme.palett.colors.primary};
  width: 100%;
  height: ${({ theme }) => theme.screen.rem(7.625)}px;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: ${({ theme }) => theme.screen.rem(1.1875)}px;
`;

export const Content = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

export const Button = styled.TouchableOpacity`
  position: absolute;
  left: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;
  color: ${({ theme }) => theme.palett.colors.shape};
`;

export const Title = styled(Text)`
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  font-size: ${({ theme }) => theme.screen.rem(1.125)}px;
  width: 100%;
  text-align: center;
`;
