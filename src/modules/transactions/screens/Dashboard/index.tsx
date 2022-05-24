import React from 'react';
import { TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootMainParamsList } from '@modules/transactions/routes';

import HighlightCard from '@modules/transactions/components/HighlightCard';
import TransactionCard, {
  TransactionsCardProps,
} from '@modules/transactions/components/TransactionCard';

import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { useTransactions } from '@modules/transactions/hooks/transactions';

import { useCalendar } from '@modules/transactions/hooks/calendar';
import { useHighlight } from '@modules/transactions/hooks/highlights';
import { useTheme } from '@shared/hooks/theme';
import {
  Container,
  Header,
  UserInfo,
  Info,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Title,
  Transactions,
  TransactionList,
  OpenCalendar,
  OpenCalendarButton,
  OpenCalendarButtonText,
} from './styles';

export type TransactionListProps = TransactionsCardProps & {
  id: string;
};

type DashboardScreenProps = DrawerNavigationProp<
  RootMainParamsList,
  'Dashboard'
>;

const Dashboard = (): JSX.Element => {
  const { dispatch, navigate } = useNavigation<DashboardScreenProps>();
  const { user } = useAuthentication();
  const { transactions } = useTransactions();
  const { highlights } = useHighlight();
  const { openSelectMonth, dateFormatted } = useCalendar();
  const { theme } = useTheme();

  return (
    <Container>
      <Header>
        <UserInfo>
          <Info onPress={() => navigate('ProfileRoutes')}>
            <Photo
              source={{
                uri:
                  user.info.photo?.url ||
                  `https://ui-avatars.com/api/?name=${user.info.name}&length=1`,
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>{user.info.name}</UserName>
            </User>
          </Info>

          <TouchableOpacity
            onPress={() => dispatch(DrawerActions.openDrawer())}
          >
            <Icon name="menu" />
          </TouchableOpacity>
        </UserInfo>
      </Header>
      <HighlightCards>
        {highlights.map(({ type, date, amount, title }) => (
          <HighlightCard
            key={type}
            title={title}
            amount={amount}
            lastTransaction={date}
            type={type}
          />
        ))}
      </HighlightCards>
      <Transactions>
        <OpenCalendar>
          <OpenCalendarButton onPress={openSelectMonth}>
            <Icon color={theme.palett.colors.primary} name="calendar" />
            <OpenCalendarButtonText>{dateFormatted}</OpenCalendarButtonText>
          </OpenCalendarButton>
        </OpenCalendar>
        <Title>Listagem</Title>
        <TransactionList
          data={transactions}
          renderItem={({ item }) => <TransactionCard data={item} />}
          keyExtractor={item => item.id}
        />
      </Transactions>
    </Container>
  );
};

export default Dashboard;
