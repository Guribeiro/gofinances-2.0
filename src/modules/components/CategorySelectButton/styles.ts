import styled from 'styled-components/native';
import { Text } from '@shared/components/Text';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

type IconProps = {
  color: string;
};

export const Container = styled(TouchableOpacity)`
  width: 100%;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  padding: ${({ theme }) => theme.screen.rem(1)}px;
  background-color: ${({ theme }) => theme.palett.colors.shape};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;
  color: ${({ theme }) => theme.palett.colors.text};
`;

export const Label = styled(Text)`
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  color: ${({ theme }) => theme.palett.colors.text};
  font-size: ${({ theme }) => theme.screen.rem(0.875, true)}px;
`;
