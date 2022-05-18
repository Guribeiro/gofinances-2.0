import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '@shared/hooks/theme';
import { Container, Label } from './styles';

interface DrawerItemProps {
  label: string;
  icon?: keyof typeof Feather.glyphMap;
  onPress: () => void;
}

const DrawerItem = ({ label, icon, onPress }: DrawerItemProps): JSX.Element => {
  const { theme } = useTheme();

  return (
    <Container onPress={onPress}>
      {icon && (
        <Feather
          name={icon}
          color={theme.palett.colors.shape}
          size={theme.screen.rem(1)}
        />
      )}
      <Label>{label}</Label>
    </Container>
  );
};

export default DrawerItem;
