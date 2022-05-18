import styled from 'styled-components/native';

const TextError = styled.Text`
  position: absolute;
  right: 0px;
  top: 6px;
  padding: 0 4px;

  color: ${({ theme }) => theme.palett.colors.shape};
  background: ${({ theme }) => theme.palett.colors.attention};
  font-family: ${({ theme }) => theme.palett.fonts.regular};

  text-transform: uppercase;
  font-size: ${({ theme }) => theme.screen.rem(0.5, true)}px;

  letter-spacing: 1px;
  border-radius: 2px;
`;

export default TextError;
