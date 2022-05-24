import { Transaction } from '@modules/transactions/hooks/transactions';

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
} from './styles';

type CategoryProps = {
  name: string;
  icon: string;
};

export type TransactionsCardProps = {
  name: string;
  amount: string;
  category: CategoryProps;
  date: string;
  type: 'income' | 'outcome';
};

type Data = {
  data: Transaction;
};

const TransactionCard = ({ data }: Data): JSX.Element => {
  return (
    <Container>
      <Title>{data.name}</Title>

      <Amount type={data.transactionType}>
        {data.transactionType === 'income' ? '+' : '-'} {data.amountFormatted}
      </Amount>

      <Footer>
        <Category>
          <Icon name={data.category.icon} color={data.category.color} />
          <CategoryName color={data.category.color}>
            {data.category.name}
          </CategoryName>
        </Category>
        <Date>{data.createdAtFormatted}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
