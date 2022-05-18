import { TouchableOpacityProps } from 'react-native';
import Loading from '@modules/main/components/Loading';
import { SvgProps } from 'react-native-svg';

import { Container } from './styles';

interface ButtonProps extends TouchableOpacityProps {
  loading?: boolean;
  svg: React.FC<SvgProps>;
}

const ButtonSignin = ({
  onPress,
  loading,
  svg: Svg,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <Container onPress={onPress} {...rest}>
      {loading ? <Loading /> : <Svg />}
    </Container>
  );
};

export default ButtonSignin;
