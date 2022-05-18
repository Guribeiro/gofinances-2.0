import { TouchableOpacityProps } from 'react-native';
import Loading from '@modules/components/Loading';

import { Container, ButtonText } from './styles';

export type Type = 'common' | 'transparent';

interface ButtonProps extends TouchableOpacityProps {
  backgroundColor?: string;
  loading?: boolean;
}

const Button = ({
  onPress,
  loading,
  children,
  backgroundColor,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <Container onPress={onPress} backgroundColor={backgroundColor} {...rest}>
      {loading ? <Loading /> : <ButtonText>{children}</ButtonText>}
    </Container>
  );
};

export default Button;
