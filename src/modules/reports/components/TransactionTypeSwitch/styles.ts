import styled, { css } from 'styled-components/native';
import { Text } from '@shared/components/Text';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Type = 'income' | 'outcome';

type IconProps = {
  color: string;
};

type TransactionTotalProps = {
  color?: string;
  selected: boolean;
};

interface TransactionTypeButtonProps {
  selected: boolean;
  type: Type;
}

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TransactionTypeButton = styled(
  TouchableOpacity,
)<TransactionTypeButtonProps>`
  width: 48%;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  padding: ${({ theme }) => theme.screen.rem(1)}px;

  border-width: 1.5px;
  border-style: solid;
  border-color: ${({ theme }) => theme.palett.colors.text};

  ${({ selected, type, theme }) =>
    selected &&
    type === 'income' &&
    css`
      background-color: ${theme.palett.colors.sucess_light};
      border-color: ${theme.palett.colors.sucess_light};
    `}

  ${({ selected, type, theme }) =>
    selected &&
    type === 'outcome' &&
    css`
      background-color: ${theme.palett.colors.attention_light};
      border-color: ${theme.palett.colors.attention_light};
    `}
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const TransactionTypeButtonText = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.title};
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  font-size: ${({ theme }) => theme.screen.rem(0.875, true)}px;
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;
  margin-right: ${({ theme }) => theme.screen.rem(0.75)}px;
  color: ${({ color }) => color};
`;

export const TransactionTotal = styled(Text)<TransactionTotalProps>`
  color: ${({ theme, color }) => color || theme.palett.colors.text};
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;

  ${({ selected }) =>
    selected &&
    css`
      color: ${({ theme }) => theme.palett.colors.white};
    `}

  text-align: center;
  margin-top: ${({ theme }) => theme.screen.rem(1)}px;
`;
