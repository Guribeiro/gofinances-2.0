import { ReactNode } from 'react';
import { AuthenticationProvider } from '@modules/authentication/hooks/authentication';
import { TransactionsProvider } from '@modules/transactions/hooks/transactions';
import { ProfileProvider } from '@modules/profile/hooks/profile';
import { ThemeProvider } from './theme';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <ProfileProvider>
          <TransactionsProvider>{children}</TransactionsProvider>
        </ProfileProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
