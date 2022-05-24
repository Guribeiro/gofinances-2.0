import styled from 'styled-components/native';
import { Text } from '@shared/components/Text';
import Constants from 'expo-constants';

import { Transaction } from '@modules/transactions/hooks/transactions';

import { FlatList, FlatListProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

const { statusBarHeight } = Constants;

type IconProps = {
  color?: string;
};

export const Container = styled.View`
  background-color: ${({ theme }) => theme.palett.colors.background};
  align-items: center;
  flex: 1;
`;

export const Header = styled.View`
  width: 100%;
  background-color: ${({ theme }) => theme.palett.colors.primary};
  height: ${({ theme }) => theme.screen.rem(17.375, true)}px;

  padding: ${({ theme }) => theme.screen.rem(1.75) + statusBarHeight}px
    ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Info = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const User = styled.View`
  margin-left: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const Photo = styled.Image`
  width: ${({ theme }) => theme.screen.rem(3.125, true)}px;
  height: ${({ theme }) => theme.screen.rem(3.125, true)}px;
  border-radius: 10px;
`;

export const UserName = styled(Text)`
  font-family: ${({ theme }) => theme.palett.fonts.bold};
  color: ${({ theme }) => theme.palett.colors.white};
`;
export const UserGreeting = styled(Text)`
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  color: ${({ theme }) => theme.palett.colors.white};
`;

export const Icon = styled(Feather)<IconProps>`
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;
  color: ${({ theme, color }) => color || theme.palett.colors.white};
`;

export const OpenCalendar = styled.View`
  align-items: flex-end;
  margin-bottom: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const OpenCalendarButton = styled.TouchableOpacity`
  width: 30%;
  align-items: center;
  justify-content: center;
`;

export const OpenCalendarButtonText = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.text};
  margin-top: ${({ theme }) => theme.screen.rem(0.5)}px;
`;

export const Title = styled(Text)`
  font-size: ${({ theme }) => theme.screen.rem(1.125, true)}px;
  color: ${({ theme }) => theme.palett.colors.title};
  padding: 0 ${({ theme }) => theme.screen.rem(1.5)}px
    ${({ theme }) => theme.screen.rem(1)}px;
  font-family: ${({ theme }) => theme.palett.fonts.regular};
`;

export const Transactions = styled.View`
  flex: 1;
  width: 100%;
  margin-top: ${({ theme }) => theme.screen.rem(6)}px;
`;

export const TransactionList = styled(
  FlatList as new (props: FlatListProps<Transaction>) => FlatList<Transaction>,
).attrs(({ theme }) => ({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: theme.screen.rem(1.5),
  },
}))``;

export const HighlightCards = styled.ScrollView.attrs(({ theme }) => ({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingLeft: theme.screen.rem(1.5),
  },
}))`
  width: 100%;
  position: absolute;
  margin-top: ${({ theme }) => theme.screen.rem(8)}px;
`;
