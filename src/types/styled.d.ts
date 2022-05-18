import 'styled-components';
import ITheme from '@shared/utils/themes/ITheme';
import type { ResponsiveTheme } from '@shared/hooks/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ResponsiveTheme, ITheme {}
}
