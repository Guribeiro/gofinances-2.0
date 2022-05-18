import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
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

type RegisterTransactionProps = {
  name: string;
  amount: string;
  category: Category;
  transactionType: string;
};

type TransactionsContextData = {
  loading: boolean;
  transactions: Transactions;
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

  useEffect(() => {
    const loadTransactions = async () => {
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
      value={{ loading, transactions, registerTransaction }}
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
