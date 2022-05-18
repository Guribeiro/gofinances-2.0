import styled from 'styled-components/native';

export const Text = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1, true)}px;
  font-family: ${({ theme }) => theme.palett.fonts.medium};
  color: ${({ theme }) => theme.palett.colors.shape};
`;
