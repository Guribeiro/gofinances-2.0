import { useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';
import NotFound from '@shared/components/NotFound';
import Loading from '@modules/transactions/components/Loading';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootMainParamsList } from '@modules/transactions/routes';

import { VictoryPie } from 'victory-native';

import { useTheme } from '@shared/hooks/theme';
import Transaction from '@modules/reports/components/Transaction';

import TransactionTypeSwitch from '@modules/reports/components/TransactionTypeSwitch';
import { useTransactions } from '@modules/reports/hooks/transactions';
import Spacer from '@modules/transactions/components/Spacer';
import Header from '@modules/transactions/components/Header';
import { useCalendar } from '@modules/reports/hooks/calendar';
import {
  Container,
  Content,
  Month,
  SelectMonth,
  SelectMonthButton,
  Icon,
  Chart,
  Transactions,
} from './styles';

type ReportsScreenParamsList = NativeStackNavigationProp<
  RootMainParamsList,
  'ReportsRoutes'
>;

const Reports = (): JSX.Element => {
  const { date, setDate, dateFormatted } = useCalendar();
  const { type, setType, totalTransactionsByCategory, loading } =
    useTransactions();
  const { theme } = useTheme();

  const { goBack } = useNavigation<ReportsScreenParamsList>();

  const handlePreviousMonth = useCallback(() => {
    setDate(subMonths(date, 1));
  }, [setDate, date]);

  const handleNextMonth = useCallback(() => {
    setDate(addMonths(date, 1));
  }, [setDate, date]);

  return (
    <Container>
      <Header title="Resumo" onGoback={goBack} />
      {loading ? (
        <Loading size="large" />
      ) : (
        <Content>
          <SelectMonth>
            <SelectMonthButton onPress={handlePreviousMonth}>
              <Icon name="chevron-left" />
            </SelectMonthButton>
            <Month>{dateFormatted}</Month>
            <SelectMonthButton onPress={handleNextMonth}>
              <Icon name="chevron-right" />
            </SelectMonthButton>
          </SelectMonth>
          <Spacer size={32} />

          {!totalTransactionsByCategory.length ? (
            <NotFound />
          ) : (
            <Transactions>
              <TransactionTypeSwitch
                selected={type}
                onPressIncome={() => setType('income')}
                onPressOutcome={() => setType('outcome')}
              />

              <Chart>
                <VictoryPie
                  data={totalTransactionsByCategory}
                  x="percent"
                  y="total"
                  colorScale={totalTransactionsByCategory.map(
                    transaction => transaction.category.color,
                  )}
                  style={{
                    labels: {
                      fontSize: theme.screen.rem(1, true),
                      fill: theme.palett.colors.white,
                      fontWeight: 'bold',
                    },
                  }}
                  labelRadius={120}
                  innerRadius={theme.screen.rem(5)}
                  padAngle={2}
                  animate={{
                    duration: 200,
                    easing: 'circle',
                  }}
                />
              </Chart>
              <Spacer size={32} />
              {totalTransactionsByCategory.map(
                ({ category, totalFormatted }) => (
                  <Transaction
                    key={category.key}
                    category={category}
                    total={totalFormatted}
                  />
                ),
              )}
              <Spacer size={32} />
            </Transactions>
          )}
        </Content>
      )}
    </Container>
  );
};

export default Reports;
