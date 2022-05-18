import styled from 'styled-components/native';

export const Container = styled.View`
  height: 100%;
  flex: 1;
  width: 100%;
  padding: ${({ theme }) => theme.screen.rem(1)}px
    ${({ theme }) => theme.screen.rem(0.625)}px
    ${({ theme }) => theme.screen.rem(5)}px;
  background: ${({ theme }) => theme.palett.colors.primary};
  justify-content: space-between;
`;

export const DrawerHeader = styled.View`
  padding-bottom: ${({ theme }) => theme.screen.rem(1.5)}px;
`;

export const DrawerText = styled.Text`
  font-size: ${({ theme }) => theme.screen.rem(1.125, true)}px;
  color: ${({ theme }) => theme.palett.colors.text};
`;
