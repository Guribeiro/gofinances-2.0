import styled from 'styled-components/native';
import { Text } from '@shared/components/Text';
import Constants from 'expo-constants';

import { FlatList, FlatListProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

import { TransactionListProps } from '.';

const { statusBarHeight } = Constants;

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

export const Info = styled(UserInfo)``;

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
`;
export const UserGreeting = styled(Text)`
  font-family: ${({ theme }) => theme.palett.fonts.regular};
`;

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(1.5, true)}px;
  color: ${({ theme }) => theme.palett.colors.attention};
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
  FlatList as new (
    props: FlatListProps<TransactionListProps>,
  ) => FlatList<TransactionListProps>,
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
