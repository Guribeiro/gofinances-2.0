import React from 'react';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from '@shared/hooks/theme';

const Container = styled.View`
  justify-content: center;
  align-items: center;
`;

const Loading = ({ size = 'small' }: ActivityIndicatorProps): JSX.Element => {
  const { theme } = useTheme();
  return (
    <Container>
      <ActivityIndicator size={size} color={theme.palett.colors.white} />
    </Container>
  );
};

export default Loading;
