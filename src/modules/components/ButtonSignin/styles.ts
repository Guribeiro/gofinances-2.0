import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.palett.colors.shape};
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
`;

export const IconContainer = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1)}px;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.palett.colors.background};
`;

export const ButtonText = styled.Text`
  flex: 1;
  font-family: ${({ theme }) => theme.palett.fonts.medium};
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  color: ${({ theme }) => theme.palett.colors.title};
  text-align: center;
`;
