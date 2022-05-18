import React, { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import styled from 'styled-components/native';
import Scroll from '@modules/components/Scroll';

export const Content = styled.View`
  flex: 1;
`;

type ContainerProps = {
  children: ReactNode;
};

const Container = ({ children }: ContainerProps): JSX.Element => (
  <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    enabled
  >
    <Content>
      <Scroll>{children}</Scroll>
    </Content>
  </KeyboardAvoidingView>
);

export default Container;
