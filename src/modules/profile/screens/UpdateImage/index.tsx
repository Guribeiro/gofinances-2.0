import { useProfile } from '@modules/profile/hooks/profile';
import Spacer from '@modules/transactions/components/Spacer';
import Loading from '@modules/transactions/components/Loading';

import { useCallback } from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';
import {
  Container,
  Content,
  Body,
  Title,
  Button,
  Icon,
  ButtonText,
  CloseButton,
} from './styles';

type UpdateImageProps = {
  onRequestClose(): void;
};

const UpdateImage = ({ onRequestClose }: UpdateImageProps): JSX.Element => {
  const { launchCamera, launchMediaLibrary, loading } = useProfile();

  const handleLaunchCamera = useCallback(async () => {
    try {
      await launchCamera();
    } catch (error) {
      Alert.alert(error as string);
    }
  }, [launchCamera]);

  const handleLaunchMediaLibrary = useCallback(async () => {
    try {
      await launchMediaLibrary();
    } catch (error) {
      Alert.alert(error as string);
    }
  }, [launchMediaLibrary]);

  return (
    <TouchableWithoutFeedback onPress={onRequestClose}>
      <Container>
        <Content>
          <Body>
            <Title>Alterar foto de perfil</Title>
            <Button onPress={handleLaunchCamera}>
              <Icon name="camera" />
              <ButtonText>Câmera</ButtonText>
            </Button>
            <Spacer size={16} />
            <Button onPress={handleLaunchMediaLibrary}>
              <Icon name="image" />
              <ButtonText>Galeria</ButtonText>
            </Button>
          </Body>
          {loading ? (
            <Loading />
          ) : (
            <CloseButton onPress={onRequestClose}>
              <Icon name="chevrons-down" />
            </CloseButton>
          )}
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default UpdateImage;
