import { NavigationContainer } from '@react-navigation/native';

import AuthenticationRoutes from '@modules/authentication/routes';

import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palett.colors.primary};
`;

const Routes = (): JSX.Element => {
  return (
    <Container>
      <NavigationContainer>
        <AuthenticationRoutes />
      </NavigationContainer>
    </Container>
  );
};

export default Routes;
