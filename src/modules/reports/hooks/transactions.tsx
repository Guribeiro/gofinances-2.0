/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {
  collection,
  onSnapshot,
  Timestamp,
  query,
  where,
} from 'firebase/firestore';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { database } from '@shared/services/firebase';
import { categories, Category } from '@shared/utils/categories';
import { format, startOfMonth, endOfMonth } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { currencyFormatter } from '@shared/utils/currencyFomatter';
import { percentFormatter } from '@shared/utils/percentFormatter';
import { useCalendar } from './calendar';

type TransactionType = 'income' | 'outcome';

type TransactionFirebase = {
  name: string;
  amount: number;
  category: Category;
  transactionType: TransactionType;
  createdAt: Timestamp;
};

type TransactionFirebaseFormatted = {
  id: string;
  createdAtFormatted: string;
  amountFormatted: string;
};

export type Transaction = TransactionFirebase & TransactionFirebaseFormatted;

export type Transactions = Array<Transaction>;

type TransactionsTotal = {
  total: number;
  totalFormatted: string;
};

export type ReportsTransactionsTotal = {
  income: TransactionsTotal;
  outcome: TransactionsTotal;
};

type TransactionsContextData = {
  loading: boolean;
  transactions: Transactions;
  reportsTransactionsTotal: ReportsTransactionsTotal;
  type: TransactionType;
  setType: React.Dispatch<React.SetStateAction<TransactionType>>;
  totalTransactionsByCategory: Array<TransactionByCategory>;
};

export type TransactionByCategory = TransactionsTotal & {
  category: Category;
  percent: string;
};

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData,
);

type TransactionsProviderProps = {
  children: ReactNode;
};

const TransactionsProvider = ({
  children,
}: TransactionsProviderProps): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transactions>(
    [] as Transactions,
  );

  const [type, setType] = useState<TransactionType>('income');

  const { user } = useAuthentication();
  const { date } = useCalendar();

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setLoading(true);
        if (!user) return;
        const startOfMonthDate = startOfMonth(date);
        const endOfMonthDate = endOfMonth(date);

        const userTransactionsCollectionRef = collection(
          database,
          'users',
          user.id,
          'transactions',
        );

        const onSnapshotQuery = query(
          userTransactionsCollectionRef,
          where('createdAt', '>=', startOfMonthDate),
          where('createdAt', '<=', endOfMonthDate),
        );

        const unsubscribe = onSnapshot(onSnapshotQuery, querySnapshot => {
          const transactionsDocsArray: Transactions = [];

          querySnapshot.forEach(queryDoc => {
            const transactionsDocData = queryDoc.data() as TransactionFirebase;

            const createdAtFormatted = format(
              transactionsDocData.createdAt.toDate(),
              'dd/MM/yyyy',
              {
                locale: ptBR,
              },
            );

            const amountFormatted = currencyFormatter(
              transactionsDocData.amount,
            );

            const transactionFormatted: Transaction = {
              ...transactionsDocData,
              id: queryDoc.id,
              createdAtFormatted,
              amountFormatted,
            };

            transactionsDocsArray.push(transactionFormatted);
          });

          setTransactions(transactionsDocsArray);
        });

        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, [user.id, date, user]);

  const reportsTransactionsTotal = useMemo(() => {
    const { income, outcome } = transactions.reduce(
      (accumulator, transaction) => {
        switch (transaction.transactionType) {
          case 'income':
            accumulator.income += transaction.amount;
            break;
          case 'outcome':
            accumulator.outcome += transaction.amount;
            break;
          default:
        }
        return accumulator;
      },
      {
        income: 0,
        outcome: 0,
      },
    );

    const incomeFormatted = currencyFormatter(income);
    const outcomeFormatted = currencyFormatter(outcome);

    return {
      income: {
        total: income,
        totalFormatted: incomeFormatted,
      },
      outcome: {
        total: outcome,
        totalFormatted: outcomeFormatted,
      },
    };
  }, [transactions]);

  const totalTransactionsByCategory = useMemo(() => {
    const transactionsByType = transactions.filter(
      transaction => transaction.transactionType === type,
    );

    const totalTransactionsByType = transactionsByType.reduce(
      (accumulator, transaction) => {
        return accumulator + transaction.amount;
      },
      0,
    );

    const incomesByCategory: Array<TransactionByCategory> = [];

    categories.forEach(category => {
      let categorySum = 0;

      transactionsByType.forEach(income => {
        if (income.category.key === category.key) {
          categorySum += income.amount;
        }
      });

      if (categorySum > 0) {
        const percent = (categorySum / totalTransactionsByType) * 100;

        const percentFormatted = percentFormatter(percent);

        incomesByCategory.push({
          category,
          total: categorySum,
          totalFormatted: currencyFormatter(categorySum),
          percent: percentFormatted,
        });
      }
    });

    return incomesByCategory;
  }, [transactions, type]);

  return (
    <TransactionsContext.Provider
      value={{
        loading,
        transactions,
        reportsTransactionsTotal,
        type,
        setType,
        totalTransactionsByCategory,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};

function useTransactions(): TransactionsContextData {
  const context = useContext(TransactionsContext);

  if (!context) {
    throw new Error(
      'useTransactions should be used within an TransactionsProvider',
    );
  }

  return context;
}

export { useTransactions, TransactionsProvider };
