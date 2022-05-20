import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
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

export const IconContainer = styled.View`
  background-color: ${({ theme }) => theme.palett.colors.secondary};
  width: ${({ theme }) => theme.screen.rem(2)}px;
  height: ${({ theme }) => theme.screen.rem(2)}px;
  border-radius: ${({ theme }) => theme.screen.rem(1)}px;

  position: absolute;
  bottom: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(Feather)`
  font-size: ${({ theme }) => theme.screen.rem(1.25, true)}px;
  color: ${({ theme }) => theme.palett.colors.shape};
`;

export const Content = styled.View`
  padding: ${({ theme }) => theme.screen.rem(1.5)}px;
  width: 100%;
`;

export const EditProfileButtons = styled.View`
  margin-top: ${({ theme }) => theme.screen.rem(2)}px;
`;
