import { NavigationContainer } from '@react-navigation/native';

import AuthenticationRoutes from '@modules/authentication/routes';
import MainRoutes from '@modules/main/routes';

import { useAuthentication } from '@modules/authentication/hooks/authentication';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palett.colors.primary};
`;

const Routes = (): JSX.Element => {
  const { user } = useAuthentication();
  return (
    <Container>
      <NavigationContainer>
        {true ? <MainRoutes /> : <AuthenticationRoutes />}
      </NavigationContainer>
    </Container>
  );
};

export default Routes;
