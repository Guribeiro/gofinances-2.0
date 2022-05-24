import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

type ContainerProps = {
  backgroundColor?: string;
};

export const Container = styled(TouchableOpacity)<ContainerProps>`
  width: 100%;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  justify-content: center;
  align-items: center;

  padding: ${({ theme }) => theme.screen.rem(1)}px;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.palett.colors.secondary};
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.palett.fonts.medium};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.shape};
`;
