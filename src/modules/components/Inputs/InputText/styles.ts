import styled from 'styled-components/native';
import { TextInput } from 'react-native';

export const Container = styled.View``;

interface TextInputRowProps {
  error: boolean;
}

export const InputText = styled(TextInput)`
  color: ${({ theme }) => theme.palett.colors.title};
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  padding: 0px ${({ theme }) => theme.screen.rem(1)}px;
  flex: 1;
`;

export const InputLabel = styled.Text`
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  line-height: ${({ theme }) => theme.screen.rem(1.5)}px;
  color: ${({ theme }) => theme.palett.colors.text};
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
`;

export const TextInputRow = styled.View<TextInputRowProps>`
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.palett.colors.attention : theme.palett.colors.shape};
  background: ${({ theme }) => theme.palett.colors.shape};
`;
