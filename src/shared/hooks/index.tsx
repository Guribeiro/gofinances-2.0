import { ReactNode } from 'react';
import { AuthenticationProvider } from '@modules/authentication/hooks/authentication';
import { TransactionsProvider } from '@modules/transactions/hooks/transactions';
import { HighlightProvider } from '@modules/transactions/hooks/highlights';
import { CalendarProvider } from '@modules/transactions/hooks/calendar';
import { ProfileProvider } from '@modules/profile/hooks/profile';
import { ReportsProvider } from '@modules/reports/hooks';
import { ThemeProvider } from './theme';

type AppProviderProps = {
  children: ReactNode;
};

const AppProvider = ({ children }: AppProviderProps): JSX.Element => {
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <ReportsProvider>
          <ProfileProvider>
            <CalendarProvider>
              <TransactionsProvider>
                <HighlightProvider>{children}</HighlightProvider>
              </TransactionsProvider>
            </CalendarProvider>
          </ProfileProvider>
        </ReportsProvider>
      </AuthenticationProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
