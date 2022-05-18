import { useTheme } from '@shared/hooks/theme';
import {
  Container,
  Header,
  Title,
  Icon,
  Content,
  Amount,
  LastTransaction,
} from './styles';

type Type = 'income' | 'outcome' | 'total';

type HighlightCardProps = {
  title: string;
  amount: string;
  lastTransaction: string;
  type: Type;
};

const HighlightCard = ({
  title,
  amount,
  lastTransaction,
  type,
}: HighlightCardProps): JSX.Element => {
  const { theme } = useTheme();

  const stylesVariations = {
    income: {
      icon: {
        name: 'arrow-up-circle',
        color: theme.palett.colors.success,
      },
      color: theme.palett.colors.title,
      background: theme.palett.colors.shape,
    },
    outcome: {
      icon: {
        name: 'arrow-down-circle',
        color: theme.palett.colors.attention,
      },
      color: theme.palett.colors.title,
      background: theme.palett.colors.shape,
    },
    total: {
      icon: {
        name: 'dollar-sign',
        color: theme.palett.colors.shape,
      },
      color: theme.palett.colors.shape,
      background: theme.palett.colors.secondary,
    },
  };

  return (
    <Container background={stylesVariations[type].background}>
      <Header>
        <Title color={stylesVariations[type].color}>{title}</Title>
        <Icon
          name={stylesVariations[type].icon.name}
          color={stylesVariations[type].icon.color}
        />
      </Header>

      <Content>
        <Amount color={stylesVariations[type].color}>{amount}</Amount>
        <LastTransaction color={stylesVariations[type].color}>
          {lastTransaction}
        </LastTransaction>
      </Content>
    </Container>
  );
};

export default HighlightCard;
