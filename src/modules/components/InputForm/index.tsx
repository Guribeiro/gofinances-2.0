import styled from 'styled-components/native';
import { Controller, Control } from 'react-hook-form';
import { cloneElement, ReactElement } from 'react';

const Container = styled.View`
  width: 100%;
`;

interface InputFormProps {
  children: ReactElement;
  control: Control;
  name: string;
}

const InputForm = ({
  children,
  control,
  name,
  ...rest
}: InputFormProps): JSX.Element => {
  return (
    <Container>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) =>
          cloneElement(children, {
            name,
            onChange,
            ...rest,
          })
        }
      />
    </Container>
  );
};

export default InputForm;
