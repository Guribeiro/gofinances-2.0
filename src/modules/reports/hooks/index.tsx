import { ReactNode } from 'react';
import { CalendarProvider } from './calendar';
import { TransactionsProvider } from './transactions';

type ReportsProviderProps = {
  children: ReactNode;
};

const ReportsProvider = ({ children }: ReportsProviderProps): JSX.Element => {
  return (
    <CalendarProvider>
      <TransactionsProvider>{children}</TransactionsProvider>
    </CalendarProvider>
  );
};

export { ReportsProvider };
