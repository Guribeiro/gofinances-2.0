import { useCallback } from 'react';
import { Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootProfileParamsList } from '@modules/profile/routes';

import { useAuthentication } from '@modules/authentication/hooks/authentication';

import Input from '@modules/transactions/components/Inputs/InputText';
import Header from '@modules/transactions/components/Header';
import Button from '@modules/transactions/components/Button';

import { useProfile } from '@modules/profile/hooks/profile';

import { Container, Content, InputContainer } from './styles';

type ProfileScreenProps = NativeStackNavigationProp<
  RootProfileParamsList,
  'UpdateName'
>;

type FormData = {
  name: string;
};

const schema = Yup.object().shape({
  name: Yup.string().required('O campo nome não pode estar vazio'),
});

const UpdateName = (): JSX.Element => {
  const { user } = useAuthentication();
  const { updateName } = useProfile();
  const { goBack } = useNavigation<ProfileScreenProps>();

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: user.info.name,
    },
    resolver: yupResolver(schema),
  });

  const handleUpdateName = useCallback(
    async ({ name }: FormData) => {
      try {
        await updateName({
          userId: user.id,
          name,
        });
      } catch (error) {
        Alert.alert(error as string);
      }
    },
    [updateName, user.id],
  );

  return (
    <Container>
      <Header title="Atualizar nome" onGoback={goBack} />
      <Content>
        <InputContainer>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <Input
                label="nome"
                onChangeText={onChange}
                value={value}
                error={error}
              />
            )}
          />
        </InputContainer>
        <Button onPress={handleSubmit(handleUpdateName)}>Atualizar</Button>
      </Content>
    </Container>
  );
};

export default UpdateName;
