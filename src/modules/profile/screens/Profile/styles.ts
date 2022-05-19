import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) => theme.palett.colors.primary};
`;

export const UserPhotoContainer = styled.View`
  width: 100%;
  align-items: center;
  justify-items: center;
`;

export const UserPhoto = styled.Image`
  width: ${({ theme }) => theme.screen.rem(7.5)}px;
  height: ${({ theme }) => theme.screen.rem(7.5)}px;
  border-radius: ${({ theme }) => theme.screen.rem(3.75)}px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
  width: 100%;
`;

export const EditProfileButtons = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(2)}px;
`;
