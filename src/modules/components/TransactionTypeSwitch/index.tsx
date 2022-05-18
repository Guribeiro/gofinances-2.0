import { useTheme } from '@shared/hooks/theme';

import {
  Container,
  TransactionTypeButton,
  TransactionTypeButtonText,
  Icon,
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

  return (
    <Container>
      <TransactionTypeButton
        type="income"
        selected={selected === 'income'}
        onPress={onPressIncome}
      >
        <Icon name="arrow-up-circle" color={theme.palett.colors.success} />
        <TransactionTypeButtonText>Entrada</TransactionTypeButtonText>
      </TransactionTypeButton>

      <TransactionTypeButton
        type="outcome"
        selected={selected === 'outcome'}
        onPress={onPressOutcome}
      >
        <Icon name="arrow-up-circle" color={theme.palett.colors.attention} />
        <TransactionTypeButtonText>Saída</TransactionTypeButtonText>
      </TransactionTypeButton>
    </Container>
  );
};

export default TransactionTypeSwitch;
