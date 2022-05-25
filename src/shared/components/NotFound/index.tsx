import { Feather } from '@expo/vector-icons';

import AnimatedLottieView from 'lottie-react-native';
import styled from 'styled-components/native';
import { Text } from '../Text';

import notFoundAnimated from '../../assets/lottie-not-found.json';

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Title = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.text};
  font-size: ${({ theme }) => theme.screen.rem(2, true)}px;
  margin-bottom: ${({ theme }) => theme.screen.rem(2, true)}px;
  text-align: center;
`;

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(4, true)}px;
  color: ${({ theme }) => theme.palett.colors.text};
`;

const NotFound = (): JSX.Element => {
  return (
    <Container>
      <Title>Não há resultados para esse período</Title>
      <AnimatedLottieView
        autoPlay
        loop
        resizeMode="contain"
        source={notFoundAnimated}
        style={{ height: 160 }}
      />
    </Container>
  );
};

export default NotFound;
