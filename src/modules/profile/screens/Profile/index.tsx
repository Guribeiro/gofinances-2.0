import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootProfileParamsList } from '@modules/profile/routes';

import { useAuthentication } from '@modules/authentication/hooks/authentication';
import EditProfileButton from '@modules/profile/components/EditProfileButton';
import Header from '@modules/main/components/Header';

import {
  Container,
  Content,
  UserPhotoContainer,
  UserPhoto,
  EditProfileButtons,
} from './styles';

type ProfileScreenProps = NativeStackNavigationProp<
  RootProfileParamsList,
  'Profile'
>;

const Profile = (): JSX.Element => {
  const { user } = useAuthentication();
  const { navigate, goBack } = useNavigation<ProfileScreenProps>();
  return (
    <Container>
      <Header title="Perfil" onGoback={goBack} />
      <Content>
        <UserPhotoContainer>
          <UserPhoto
            source={{
              uri:
                user.info.photo ||
                `https://ui-avatars.com/api/?name=${user.info.name}`,
            }}
          />
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
    </Container>
  );
};

export default Profile;
