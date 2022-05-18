import React from 'react';
import { TouchableOpacity } from 'react-native';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootMainParamsList } from '@modules/main/routes';

import HighlightCard from '@modules/main/components/HighlightCard';
import TransactionCard, {
  TransactionsCardProps,
} from '@modules/main/components/TransactionCard';

import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { useTransactions } from '@modules/main/hooks/transactions';
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
} from './styles';

export type TransactionListProps = TransactionsCardProps & {
  id: string;
};

type DashboardScreenProps = DrawerNavigationProp<
  RootMainParamsList,
  'Dashboard'
>;

const Dashboard = (): JSX.Element => {
  const { dispatch } = useNavigation<DashboardScreenProps>();
  const { user } = useAuthentication();
  const { transactions } = useTransactions();

  return (
    <Container>
      <Header>
        <UserInfo>
          <Info>
            <Photo
              source={{
                uri: user.info.photo,
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
        <HighlightCard
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
          type="income"
        />
        <HighlightCard
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 3 de abril"
          type="outcome"
        />
        <HighlightCard
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
          type="total"
        />
      </HighlightCards>
      <Transactions>
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
