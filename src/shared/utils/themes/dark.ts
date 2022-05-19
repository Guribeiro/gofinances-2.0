import { Palette } from './ITheme';

export const dark: Palette = {
  title: 'dark',
  fonts: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    bold: 'Poppins_700Bold',
  },
  colors: {
    primary: '#5636D3',

    secondary: '#FF872C',
    secondary_light: 'rgba(255, 135, 44, 0.3)',

    success: '#12A454',
    sucess_light: 'rgba(18, 164, 84, 0.5)',

    attention: '#E83F5B',
    attention_light: 'rgba(232, 63, 91, 0.5)',

    shape: '#1B1B1D',
    title: '#363F5F',
    text: '#E9EDEE',
    background: '#141517',
    white: '#FFFFFF',
  },
} as const;

export type DarkThemeType = typeof dark;
