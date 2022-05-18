import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { Text } from '@shared/components/Text';

interface AmountProps {
  type: 'income' | 'outcome';
}

export const Container = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1.125)}px;
  background: ${({ theme }) => theme.palett.colors.shape};
  margin-bottom: ${({ theme }) => theme.screen.rem(1)}px;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
`;

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(0.875, true)}px;
  color: ${({ theme }) => theme.palett.colors.text};
`;

export const Amount = styled(Text)<AmountProps>`
  font-size: ${({ theme }) => theme.screen.rem(1.25, true)}px;
  color: ${({ theme, type }) =>
    type === 'income'
      ? theme.palett.colors.success
      : theme.palett.colors.attention};
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  margin-top: 2px;
`;
export const Footer = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(1.125)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const Category = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CategoryName = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(0.875, true)}px;
  color: ${({ theme }) => theme.palett.colors.text};
  font-family: ${({ theme }) => theme.palett.fonts.regular};
`;

export const Date = styled(CategoryName)``;

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(1.25, true)}px;
  color: ${({ theme }) => theme.palett.colors.text};
  margin-right: ${({ theme }) => theme.screen.rem(0.75, true)}px;
`;
