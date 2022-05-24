import { createContext, useContext, ReactNode, useMemo } from 'react';
import { endOfMonth, format, startOfMonth, isValid } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { currencyFormatter } from '@shared/utils/currencyFomatter';
import { useTransactions } from './transactions';
import { useCalendar } from './calendar';

type HighlightType = 'income' | 'outcome' | 'total';

type Highlight = {
  type: HighlightType;
  amount: string;
  title: string;
  date: string;
};

type Highlights = Array<Highlight>;

type HighlightContextData = {
  highlights: Highlights;
};

const HighlightContext = createContext<HighlightContextData>(
  {} as HighlightContextData,
);

type HighlightProviderProps = {
  children: ReactNode;
};

const HighlightProvider = ({
  children,
}: HighlightProviderProps): JSX.Element => {
  const { transactions } = useTransactions();
  const { date } = useCalendar();

  const highlights = useMemo(() => {
    const { income, outcome, total } = transactions.reduce(
      (accumulator, current) => {
        switch (current.transactionType) {
          case 'income':
            accumulator.income += current.amount;
            accumulator.total += current.amount;
            break;

          case 'outcome':
            accumulator.outcome += current.amount;
            accumulator.total -= current.amount;
            break;
          default:
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    const startOfMonthDate = startOfMonth(date);
    const endOfMonthDate = endOfMonth(date);

    const startOfMonthDateFormatted = format(startOfMonthDate, 'dd');
    const endOfMonthDateFormatted = format(endOfMonthDate, "dd 'de' LLLL", {
      locale: ptBR,
    });

    const totalDateRangeFormatted = `${startOfMonthDateFormatted} à ${endOfMonthDateFormatted}`;

    let lastIncomeTransactionDateFormatted: string;
    let lastOutcomeTransactionDateFormatted: string;

    const lastIncomeTransactionDate = new Date(
      Math.max(
        ...transactions
          .filter(transaction => transaction.transactionType === 'income')
          .map(transaction => transaction.createdAt.toDate().getTime()),
      ),
    );

    const lastOutcomeTransactionDate = new Date(
      Math.max(
        ...transactions
          .filter(transaction => transaction.transactionType === 'outcome')
          .map(transaction => transaction.createdAt.toDate().getTime()),
      ),
    );

    if (
      isValid(lastIncomeTransactionDate) &&
      isValid(lastOutcomeTransactionDate)
    ) {
      lastIncomeTransactionDateFormatted = format(
        lastIncomeTransactionDate,
        "'Última entrada dia' dd 'de' LLLL ",
        { locale: ptBR },
      );

      lastOutcomeTransactionDateFormatted = format(
        lastOutcomeTransactionDate,
        "'Última saída dia' dd 'de' LLLL ",
        { locale: ptBR },
      );
    } else {
      lastIncomeTransactionDateFormatted = 'Não há resultados nesse período';
      lastOutcomeTransactionDateFormatted = 'Não há resultados nesse período';
    }

    const highlightsFormatted = {
      income: {
        amount: currencyFormatter(income),
        date: lastIncomeTransactionDateFormatted,
      },
      outcome: {
        amount: currencyFormatter(outcome),
        date: lastOutcomeTransactionDateFormatted,
      },
      total: {
        amount: currencyFormatter(total),
        date: totalDateRangeFormatted,
      },
    };

    const titleVariations = {
      income: 'Entradas',
      outcome: 'Saídas',
      total: 'Total',
    };

    const highlightsFormattedAsArray = Object.keys(highlightsFormatted).map(
      highlight => {
        const key = highlight as HighlightType;

        return {
          type: key,
          title: titleVariations[key],
          amount: highlightsFormatted[key].amount,
          date: highlightsFormatted[key].date,
        };
      },
    );

    return highlightsFormattedAsArray;
  }, [transactions, date]);

  return (
    <HighlightContext.Provider value={{ highlights }}>
      {children}
    </HighlightContext.Provider>
  );
};

function useHighlight(): HighlightContextData {
  const context = useContext(HighlightContext);

  if (!context) {
    throw new Error('useHighlight should be used within an HighlightProvider');
  }

  return context;
}

export { useHighlight, HighlightProvider };
