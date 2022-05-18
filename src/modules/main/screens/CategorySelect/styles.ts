import styled, { css } from 'styled-components/native';
import { Text } from '@shared/components/Text';
import { Feather } from '@expo/vector-icons';
import { transparentize } from 'polished';

type IconProps = {
  color: string;
  selected: boolean;
};

type NameProps = {
  color: string;
  selected: boolean;
};

type CategoryButtonProps = {
  color: string;
  selected: boolean;
};

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.palett.colors.background};
`;

export const Content = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.palett.colors.background};
  justify-content: space-between;
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
  width: 100%;
`;

export const CategoryButton = styled.TouchableOpacity<CategoryButtonProps>`
  width: 30%;
  height: ${({ theme }) => theme.screen.rem(6)}px;
  margin: 5px;
  align-items: center;
  justify-content: center;
  border: 1.5px solid ${({ color }) => color};
  padding: ${({ theme }) => theme.screen.rem(0.6)}px;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  background: ${({ color }) => transparentize(0.9, color)};

  ${({ color, selected }) =>
    selected &&
    css`
      background: ${transparentize(0.5, color)};
    `}
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const Icon = styled(Feather)<IconProps>`
  color: ${({ color }) => color};
  margin-bottom: ${({ theme }) => theme.screen.rem(0.5)}px;
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;

  ${({ theme, selected }) =>
    selected &&
    css`
      color: ${theme.palett.colors.shape};
    `}
`;

export const Name = styled(Text)<NameProps>`
  color: ${({ color }) => color};
  font-size: ${({ theme }) => theme.screen.rem(0.825, true)}px;

  ${({ theme, selected }) =>
    selected &&
    css`
      color: ${theme.palett.colors.shape};
    `}
`;

export const CategoriesList = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
