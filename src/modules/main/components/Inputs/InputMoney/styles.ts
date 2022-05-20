import styled from 'styled-components/native';
import { MaskedTextInput } from 'react-native-mask-text';

export const Container = styled.View``;

interface TextInputRowProps {
  error: boolean;
}

export const TextInputRow = styled.View<TextInputRowProps>`
  flex-direction: row;
  align-items: center;
  border-radius: ${({ theme }) => theme.screen.rem(0.3125)}px;
  border: 1px solid
    ${({ theme, error }) =>
      error ? theme.palett.colors.attention : theme.palett.colors.background};
  background: ${({ theme }) => theme.palett.colors.shape};
  height: ${({ theme }) => theme.screen.rem(3.6)}px;
`;

export const InputLabel = styled.Text`
  text-transform: uppercase;
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  letter-spacing: 1px;
  color: ${({ theme }) => theme.palett.colors.text};
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;
  line-height: ${({ theme }) => theme.screen.rem(1)}px;
`;

export const TextInputMasked = styled(MaskedTextInput)`
  color: ${({ theme }) => theme.palett.colors.text};
  height: ${({ theme }) => theme.screen.rem(3.375)}px;
  padding: 0 ${({ theme }) => theme.screen.rem(1)}px 0 0;
  flex: 1;
`;

export const Prefix = styled.Text`
  color: ${({ theme }) => theme.palett.colors.text};
  margin: 0 ${({ theme }) => theme.screen.rem(0.3)}px 0
    ${({ theme }) => theme.screen.rem(1)}px;
`;
