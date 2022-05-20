import { NavigationContainer } from '@react-navigation/native';

import styled from 'styled-components/native';

import SplashRoutes from './splash.routes';

const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.palett.colors.primary};
`;

const Routes = (): JSX.Element => {
  return (
    <Container>
      <NavigationContainer>
        <SplashRoutes />
      </NavigationContainer>
    </Container>
  );
};

export default Routes;
