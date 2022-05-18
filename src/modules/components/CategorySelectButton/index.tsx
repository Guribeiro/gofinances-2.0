import { TouchableOpacityProps } from 'react-native';

import { Container, Label, Icon } from './styles';

type CategorySelectButtonProps = TouchableOpacityProps & {
  label: string;
};

const CategorySelectButton = ({
  label,
  onPress,
  ...rest
}: CategorySelectButtonProps): JSX.Element => {
  return (
    <Container onPress={onPress} {...rest}>
      <Label>{label}</Label>
      <Icon name="chevron-down" />
    </Container>
  );
};

export default CategorySelectButton;
