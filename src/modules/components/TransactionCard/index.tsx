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
  title: string;
  amount: string;
  category: CategoryProps;
  date: string;
  type: 'income' | 'outcome';
};

type Data = {
  data: TransactionsCardProps;
};

const TransactionCard = ({ data }: Data): JSX.Element => {
  return (
    <Container>
      <Title>{data.title}</Title>

      <Amount type={data.type}>
        {data.type === 'income' ? '+' : '-'} {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name="dollar-sign" />
          <CategoryName>{data.category.name}</CategoryName>
        </Category>
        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
};

export default TransactionCard;
