import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootProfileParamsList } from '@modules/profile/routes';
import { useAuthentication } from '@modules/authentication/hooks/authentication';
import EditProfileButton from '@modules/profile/components/EditProfileButton';
import Header from '@modules/main/components/Header';
import { useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import UpdateImage from '../UpdateImage';

import {
  Container,
  Content,
  UserPhotoContainer,
  UserPhoto,
  EditProfileButtons,
  IconContainer,
  Icon,
} from './styles';

type ProfileScreenProps = NativeStackNavigationProp<
  RootProfileParamsList,
  'Profile'
>;

const Profile = (): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const { user } = useAuthentication();
  const { navigate, goBack } = useNavigation<ProfileScreenProps>();

  const updateImageOffset = useSharedValue(INITIAL_VALUE);

  const updateImageStyle = useAnimatedStyle(() => {
    return {
      bottom: updateImageOffset.value,
    };
  });

  const openUpdateImage = useCallback(() => {
    updateImageOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [updateImageOffset]);

  const closeUpdateImage = useCallback(() => {
    updateImageOffset.value = withTiming(INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [updateImageOffset, INITIAL_VALUE]);

  return (
    <Container>
      <Header title="Perfil" onGoback={goBack} />
      <Content>
        <UserPhotoContainer>
          <TouchableOpacity onPress={openUpdateImage}>
            <UserPhoto
              source={{
                uri:
                  user.info.photo?.url ||
                  `https://ui-avatars.com/api/?name=${user.info.name}&length=1`,
              }}
            />
            <IconContainer>
              <Icon name="camera" />
            </IconContainer>
          </TouchableOpacity>
        </UserPhotoContainer>
        <EditProfileButtons>
          <EditProfileButton
            label="nome"
            type="common"
            onPress={() => navigate('UpdateName')}
          >
            {user.info.name}
          </EditProfileButton>
        </EditProfileButtons>
      </Content>
      <Animated.View
        style={[
          updateImageStyle,
          { width: '100%', height: '100%', position: 'absolute' },
        ]}
      >
        <UpdateImage onRequestClose={closeUpdateImage} />
      </Animated.View>
    </Container>
  );
};

export default Profile;
