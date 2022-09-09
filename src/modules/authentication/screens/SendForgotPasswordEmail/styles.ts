import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Body = styled.View`
  flex: 2;
  height: 100%;
  background: ${({ theme }) => theme.palett.colors.primary};
  align-items: center;
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const Form = styled.View`
  flex: 1;
  width: 100%;
  justify-content: space-between;
`;
