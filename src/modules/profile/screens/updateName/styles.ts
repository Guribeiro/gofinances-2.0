import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.palett.colors.primary};
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
  width: 100%;
`;

export const InputContainer = styled.View`
  margin: ${({ theme }) => theme.screen.rem(2)}px 0;
`;
