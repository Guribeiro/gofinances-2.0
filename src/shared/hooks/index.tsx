import { AuthenticationProvider } from '@modules/authentication/hooks/authentication';
import { TransactionsProvider } from '@modules/main/hooks/transactions';
import { ReactNode } from 'react';
import { ThemeProvider } from './theme';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <TransactionsProvider>{children}</TransactionsProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
