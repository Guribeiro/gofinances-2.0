import { useCallback, useState } from 'react';
import { TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useForm, Controller } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTransactions } from '@modules/transactions/hooks/transactions';

import { Category } from '@shared/utils/categories';
import { verifyCodeError } from '@shared/utils/errors/firebase';

import { RootMainParamsList } from '@modules/transactions/routes';
import Spacer from '@modules/transactions/components/Spacer';
import Input from '@modules/transactions/components/Inputs/InputText';
import InputMoney from '@modules/transactions/components/Inputs/InputMoney';
import Button from '@modules/transactions/components/Button';

import Header from '@modules/transactions/components/Header';

import TransactionTypeSwitch from '@modules/transactions/components/TransactionTypeSwitch';
import CategorySelectButton from '@modules/transactions/components/CategorySelectButton';
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

type RegisterTransactionScreenProps = NativeStackNavigationProp<
  RootMainParamsList,
  'RegisterTransaction'
>;

const RegisterTransaction = (): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const [transactionType, setTransactionType] = useState<TransactionType>('');
  const [categorySelected, setCategorySelected] = useState<Category>(
    {} as Category,
  );

  const { goBack, navigate } = useNavigation<RegisterTransactionScreenProps>();
  const { registerTransaction, loading } = useTransactions();

  const { control, handleSubmit, setValue, reset } = useForm<FormData>({
    defaultValues: {
      name: '',
      amount: '',
    },
    resolver: yupResolver(schema),
  });

  const clearFields = useCallback(() => {
    reset({
      name: '',
      amount: '',
    });
    setValue('amount', '');
    setCategorySelected({} as Category);
    setTransactionType('');
  }, [reset]);

  const handleSelectCategory = useCallback((category: Category) => {
    setCategorySelected(prev =>
      prev.key === category.key ? ({} as Category) : category,
    );
  }, []);

  const onSubmit = useCallback(
    async ({ name, amount }: FormData) => {
      try {
        if (!transactionType) {
          throw new Error('Selecione o tipo da sua transação');
        }

        if (!categorySelected.key) {
          throw new Error('Selecione a categoria da sua transação');
        }

        await registerTransaction({
          name,
          amount,
          category: categorySelected,
          transactionType,
        });

        clearFields();
        navigate('Dashboard');
      } catch (error) {
        const message = verifyCodeError(error);
        Alert.alert('Ops...', message);
      }
    },
    [
      transactionType,
      categorySelected,
      registerTransaction,
      navigate,
      clearFields,
    ],
  );

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
        <Header title="Cadastrar transação" onGoback={goBack} />
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
                  defaultValue={value}
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

          <Button loading={loading} onPress={handleSubmit(onSubmit)}>
            Enviar
          </Button>
        </Form>

        <Animated.View
          style={[
            categorySelectModalStyle,
            { position: 'absolute', alignSelf: 'center', height: '100%' },
          ]}
        >
          <CategorySelect
            onClose={closeCategorySelectModal}
            setCategory={handleSelectCategory}
            category={categorySelected}
          />
        </Animated.View>
      </Container>
    </TouchableWithoutFeedback>
  );
};

export default RegisterTransaction;
