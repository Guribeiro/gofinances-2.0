import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.palett.colors.background};
`;

export const Form = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;

export const Field = styled.View``;
