import styled from 'styled-components/native';
import { Text } from '@shared/components/Text';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: ${({ theme }) => theme.screen.rem(1.5)}px
    ${({ theme }) => theme.screen.rem(1.5)}px 0;
`;

export const Body = styled.View`
  flex: 1;
`;

export const SelectMonth = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(1.25, true)}px;
  color: ${({ theme }) => theme.palett.colors.white};
`;

export const Month = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.4, true)}px;
  color: ${({ theme }) => theme.palett.colors.title};
  font-family: ${({ theme }) => theme.palett.fonts.regular};
`;

export const SelectMonthButton = styled.TouchableOpacity`
  width: ${({ theme }) => theme.screen.rem(1.4)}px;
  height: ${({ theme }) => theme.screen.rem(1.4)}px;

  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.screen.rem(0.2)}px;

  background: ${({ theme }) => theme.palett.colors.primary};
`;

export const Chart = styled.View`
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Transactions = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;
