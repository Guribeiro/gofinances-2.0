import { useTransactions } from '@modules/reports/hooks/transactions';
import { useTheme } from '@shared/hooks/theme';

import {
  Container,
  TransactionTypeButton,
  TransactionTypeButtonText,
  TransactionTotal,
  Icon,
  Row,
} from './styles';

interface TransactionTypeSwitchProps {
  selected: 'income' | 'outcome' | string;
  onPressIncome(): void;
  onPressOutcome(): void;
}

const TransactionTypeSwitch = ({
  selected,
  onPressIncome,
  onPressOutcome,
}: TransactionTypeSwitchProps): JSX.Element => {
  const { theme } = useTheme();
  const { reportsTransactionsTotal } = useTransactions();

  return (
    <Container>
      <TransactionTypeButton
        type="income"
        selected={selected === 'income'}
        onPress={onPressIncome}
      >
        <Row>
          <Icon name="arrow-up-circle" color={theme.palett.colors.success} />
          <TransactionTypeButtonText>Entrada</TransactionTypeButtonText>
        </Row>
        <TransactionTotal
          selected={selected === 'income'}
          color={theme.palett.colors.success}
        >
          {reportsTransactionsTotal.income.totalFormatted}
        </TransactionTotal>
      </TransactionTypeButton>

      <TransactionTypeButton
        type="outcome"
        selected={selected === 'outcome'}
        onPress={onPressOutcome}
      >
        <Row>
          <Icon name="arrow-up-circle" color={theme.palett.colors.attention} />
          <TransactionTypeButtonText>Saída</TransactionTypeButtonText>
        </Row>
        <TransactionTotal
          selected={selected === 'outcome'}
          color={theme.palett.colors.attention}
        >
          {reportsTransactionsTotal.outcome.totalFormatted}
        </TransactionTotal>
      </TransactionTypeButton>
    </Container>
  );
};

export default TransactionTypeSwitch;
