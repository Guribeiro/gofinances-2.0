/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { addDoc, collection, onSnapshot, Timestamp } from 'firebase/firestore';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import { database } from '@shared/services/firebase';
import { Category } from '@shared/utils/categories';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { currencyFormatter } from '@shared/utils/currencyFomatter';

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

export type TransactionsHighlight = Array<{
  [key: string]: string;
}>;

type RegisterTransactionProps = {
  name: string;
  amount: string;
  category: Category;
  transactionType: string;
};

type TransactionsContextData = {
  loading: boolean;
  transactions: Transactions;
  transactionsHighlight: TransactionsHighlight;
  registerTransaction(props: RegisterTransactionProps): Promise<void>;
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

  const { user } = useAuthentication();

  const registerTransaction = useCallback(
    async ({
      name,
      amount,
      category,
      transactionType,
    }: RegisterTransactionProps) => {
      try {
        setLoading(true);
        const createdAt = Timestamp.fromDate(new Date());

        const userTransactionsCollectionRef = collection(
          database,
          'users',
          user.id,
          'transactions',
        );

        const amountAsNumber = Number(amount);

        await addDoc(userTransactionsCollectionRef, {
          name,
          amount: amountAsNumber,
          category,
          transactionType,
          createdAt,
        });
      } catch (error) {
        throw new Error(error as string);
      } finally {
        setLoading(false);
      }
    },
    [user.id],
  );

  const transactionsHighlight = useMemo(() => {
    const transactionsHighlightTotal = transactions.reduce(
      (accumulator, current) => {
        switch (current.transactionType) {
          case 'income':
            accumulator.incomes += current.amount;
            accumulator.total += current.amount;
            break;

          case 'outcome':
            accumulator.outcomes += current.amount;
            accumulator.total -= current.amount;
            break;
          default:
        }
        return accumulator;
      },
      {
        incomes: 0,
        outcomes: 0,
        total: 0,
      },
    );

    const formatted = Object.keys(transactionsHighlightTotal).map(item => {
      const key = item as 'incomes' | 'outcomes' | 'total';

      return {
        [key]: currencyFormatter(transactionsHighlightTotal[key]),
      };
    });

    return formatted;
  }, [transactions]);

  useEffect(() => {
    const loadTransactions = async () => {
      if (!user.id) return;
      const userTransactionsCollectionRef = collection(
        database,
        'users',
        user.id,
        'transactions',
      );

      const unsubscribe = onSnapshot(
        userTransactionsCollectionRef,
        querySnapshot => {
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
        },
      );

      return () => unsubscribe();
    };
    loadTransactions();
  }, [user.id]);

  return (
    <TransactionsContext.Provider
      value={{
        loading,
        transactions,
        transactionsHighlight,
        registerTransaction,
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
