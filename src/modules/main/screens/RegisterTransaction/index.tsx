import { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Category } from '@shared/utils/categories';

import Spacer from '@modules/main/components/Spacer';
import Input from '@modules/main/components/Inputs/InputText';
import InputMoney from '@modules/main/components/Inputs/InputMoney';
import Button from '@modules/main/components/Button';

import Header from '@modules/main/components/Header';

import TransactionTypeSwitch from '@modules/main/components/TransactionTypeSwitch';
import CategorySelectButton from '@modules/main/components/CategorySelectButton';
import CategorySelect from '../CategorySelect';

import { Container, Form, Field } from './styles';

type TransactionType = 'outcome' | 'income' | string;

interface FormData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Informe o nome da sua transação'),
  amount: Yup.string()
    .required('campo obrigatório')
    .notOneOf(['0'], 'Valor inválido'),
});

const RegisterTransaction = (): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const { control, handleSubmit, setValue } = useForm<FormData>({
    defaultValues: {
      name: '',
      amount: '',
    },
    resolver: yupResolver(schema),
  });

  const [transactionType, setTransactionType] = useState<TransactionType>('');

  const [categorySelected, setCategorySelected] = useState<Category>(
    {} as Category,
  );

  const onSubmit = useCallback(({ name, amount }: FormData) => {
    console.log({
      name,
      amount,
      category: categorySelected.key,
      transactionType,
    });
  }, []);

  const categorySelectModaloffset = useSharedValue(INITIAL_VALUE);

  const categorySelectModalStyle = useAnimatedStyle(() => {
    return {
      bottom: categorySelectModaloffset.value,
    };
  });

  const openCategorySelectModal = useCallback(() => {
    categorySelectModaloffset.value = withTiming(FINAL_VALUE, {
      duration: 300,
      easing: Easing.ease,
    });
  }, [FINAL_VALUE, categorySelectModaloffset]);

  const closeCategorySelectModal = useCallback(() => {
    categorySelectModaloffset.value = withTiming(INITIAL_VALUE, {
      duration: 300,
      easing: Easing.ease,
    });
  }, [categorySelectModaloffset, INITIAL_VALUE]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Cadastrar transação" />
        <Form>
          <Field>
            <Controller
              name="name"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <Input
                  label="Nome"
                  required
                  onChangeText={onChange}
                  value={value}
                  error={error}
                />
              )}
            />

            <Spacer size={16} />
            <Controller
              name="amount"
              control={control}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <InputMoney
                  label="valor"
                  prefix="R$"
                  required
                  onChangeText={(text, rawValue) => {
                    onChange(text);
                    setValue('amount', rawValue);
                  }}
                  value={value}
                  error={error}
                />
              )}
            />
            <Spacer size={16} />
            <TransactionTypeSwitch
              selected={transactionType}
              onPressIncome={() => setTransactionType('income')}
              onPressOutcome={() => setTransactionType('outcome')}
            />
            <Spacer size={16} />
            <CategorySelectButton
              label={categorySelected.name || 'Categorias'}
              onPress={openCategorySelectModal}
            />
          </Field>

          <Button onPress={handleSubmit(onSubmit)}>Enviar</Button>
        </Form>

        <Animated.View
          style={[
            categorySelectModalStyle,
            { position: 'absolute', alignSelf: 'center', height: '100%' },
          ]}
        >
          <CategorySelect
            onClose={closeCategorySelectModal}
            setCategory={setCategorySelected}
            category={categorySelected}
          />
        </Animated.View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default RegisterTransaction;
