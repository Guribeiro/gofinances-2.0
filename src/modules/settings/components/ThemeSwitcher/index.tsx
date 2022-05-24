import React, { useCallback } from 'react';
import { Text } from '@shared/components/Text';
import styled from 'styled-components/native';
import { useTheme } from '@shared/hooks/theme';
import { Feather } from '@expo/vector-icons';
import Spacer from '@modules/transactions/components/Spacer';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { Pressable } from 'react-native';

const Container = styled.View`
  flex: 1;
`;

export const Label = styled(Text)`
  color: ${({ theme }) => theme.palett.colors.text};
  font-family: ${({ theme }) => theme.palett.fonts.regular};
  font-size: ${({ theme }) => theme.screen.rem(1.125)}px;
`;

export const SmallText = styled(Label)`
  font-size: ${({ theme }) => theme.screen.rem(0.825, true)}px;
`;

export const LabelBold = styled(Label)`
  font-family: ${({ theme }) => theme.palett.fonts.bold};
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SwitchCircleInner = styled.View`
  align-items: center;
  justify-content: flex-start;
  border-radius: 50px;
  height: ${({ theme }) => theme.screen.rem(7.5)}px;
  width: ${({ theme }) => theme.screen.rem(4)}px;
  background-color: ${({ theme }) => theme.palett.colors.shape};
  box-shadow: 0px 20px 20px ${({ theme }) => theme.palett.colors.text};
  position: relative;
`;

const SwitchButtonContainer = styled.View`
  align-items: center;
`;

const SwitchButton = (): JSX.Element => {
  const { changeTheme, theme } = useTheme();
  const SWITCH_INITIAL_VALUE = theme.screen.rem(0.6);
  const SWITCH_FINAL_VALUE = theme.screen.rem(4.6);

  const switchCircleX = useSharedValue(
    theme.palett.title === 'dark' ? SWITCH_FINAL_VALUE : SWITCH_INITIAL_VALUE,
  );

  const switchCircleXStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      top: switchCircleX.value,
    };
  });

  const handleSwitchCircleX = useCallback(() => {
    switchCircleX.value = withTiming(
      theme.palett.title === 'light'
        ? SWITCH_FINAL_VALUE
        : SWITCH_INITIAL_VALUE,
      {
        duration: 1000,
        easing: Easing.bounce,
      },
    );
    changeTheme({
      theme_name: theme.palett.title === 'dark' ? 'light' : 'dark',
    });
  }, [
    switchCircleX,
    changeTheme,
    theme.palett.title,
    SWITCH_INITIAL_VALUE,
    SWITCH_FINAL_VALUE,
  ]);

  return (
    <SwitchButtonContainer>
      <SmallText>Pressione para mudar</SmallText>
      <Spacer size={32} />
      <Pressable
        style={{ justifyContent: 'center', alignContent: 'center' }}
        onPress={() => handleSwitchCircleX()}
      >
        <SwitchCircleInner>
          <Animated.View style={switchCircleXStyle}>
            <Feather
              name={theme.palett.title === 'dark' ? 'sun' : 'moon'}
              color={
                theme.palett.title === 'dark'
                  ? theme.palett.colors.secondary
                  : theme.palett.colors.primary
              }
              size={theme.screen.rem(2)}
            />
          </Animated.View>
        </SwitchCircleInner>
      </Pressable>
    </SwitchButtonContainer>
  );
};

const ThemeSwitcher = (): JSX.Element => {
  const { theme } = useTheme();

  return (
    <Container>
      <LabelContainer>
        <Label>Tema atual:</Label>
        <Spacer size={8} horizontal />
        <Feather
          name={theme.palett.title === 'light' ? 'sun' : 'moon'}
          color={
            theme.palett.title === 'light'
              ? theme.palett.colors.secondary
              : theme.palett.colors.primary
          }
          size={theme.screen.rem(1, true)}
        />
      </LabelContainer>
      <Spacer size={16} />
      <Spacer size={32} />
      <SwitchButton />
    </Container>
  );
};

export default ThemeSwitcher;
