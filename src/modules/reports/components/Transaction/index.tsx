import styled from 'styled-components/native';
import { Text } from '@shared/components/Text';
import { Feather } from '@expo/vector-icons';
import { Category } from '@shared/utils/categories';
import { transparentize } from 'polished';

type ColorProps = {
  color: string;
};

export const Container = styled.View<ColorProps>`
  flex-direction: row;
  overflow: hidden;
  width: 100%;
  border: 1px solid ${({ color }) => color};
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  margin-bottom: ${({ theme }) => theme.screen.rem(0.5)}px;
`;

export const IconContainer = styled.View<ColorProps>`
  width: ${({ theme }) => theme.screen.rem(4.0625)}px;
  height: ${({ theme }) => theme.screen.rem(4.0625)}px;
  background: ${({ color }) => transparentize(0.9, color)};
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-style: solid;
  border-right-color: ${({ color }) => color};
`;

export const Icon = styled(Feather)<ColorProps>`
  font-size: ${({ theme }) => theme.screen.rem(1.25, true)}px;
  color: ${({ color }) => color};
`;

export const Content = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(1.6, true)}px;
`;

export const TransactionCategoryText = styled(Text)<ColorProps>`
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
`;

export const TransactionTotalText = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.title};
  font-family: ${({ theme }) => theme.palett.fonts.bold};
`;

type TransactionProps = {
  total: string;
  category: Category;
};

const Transaction = ({ category, total }: TransactionProps): JSX.Element => {
  return (
    <Container color={category.color}>
      <IconContainer color={category.color}>
        <Icon name={category.icon} color={category.color} />
      </IconContainer>
      <Content>
        <TransactionCategoryText color={category.color}>
          {category.name}
        </TransactionCategoryText>
        <TransactionTotalText>{total}</TransactionTotalText>
      </Content>
    </Container>
  );
};

export default Transaction;
