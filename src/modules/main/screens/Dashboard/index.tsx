import { TouchableOpacity } from 'react-native';
import React from 'react';
import HighlightCard from '@modules/main/components/HighlightCard';
import TransactionCard, {
  TransactionsCardProps,
} from '@modules/main/components/TransactionCard';

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

const Dashboard = (): JSX.Element => {
  const transactions: Array<TransactionListProps> = [
    {
      id: '1',
      title: 'Desenvolvimento de site',
      amount: 'R$12.000,00',
      category: {
        icon: 'dollar-sign',
        name: 'Vendas',
      },
      date: '16/05/2022',
      type: 'income',
    },
    {
      id: '2',
      title: 'Desenvolvimento de site',
      amount: 'R$12.000,00',
      category: {
        icon: 'dollar-sign',
        name: 'Vendas',
      },
      date: '16/05/2022',
      type: 'outcome',
    },
    {
      id: '3',
      title: 'Desenvolvimento de site',
      amount: 'R$12.000,00',
      category: {
        icon: 'dollar-sign',
        name: 'Vendas',
      },
      date: '16/05/2022',
      type: 'income',
    },
    {
      id: '4',
      title: 'Desenvolvimento de site',
      amount: 'R$12.000,00',
      category: {
        icon: 'dollar-sign',
        name: 'Vendas',
      },
      date: '16/05/2022',
      type: 'outcome',
    },
  ];
  return (
    <Container>
      <Header>
        <UserInfo>
          <Info>
            <Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/50778163?v=4',
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Gustavo</UserName>
            </User>
          </Info>

          <TouchableOpacity onPress={() => console.log('pressed')}>
            <Icon name="power" />
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
