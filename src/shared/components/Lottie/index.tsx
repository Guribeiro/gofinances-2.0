import AnimatedLottieView from 'lottie-react-native';
import lottieLoadingSource from '../../assets/lottie-loading.json';

const Lottie = (): JSX.Element => {
  return (
    <AnimatedLottieView
      autoPlay
      loop
      resizeMode="contain"
      source={lottieLoadingSource}
    />
  );
};

export default Lottie;
