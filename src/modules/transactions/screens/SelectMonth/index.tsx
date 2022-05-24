import { format, addMonths, subMonths } from 'date-fns';
import ptBR from 'date-fns/esm/locale/pt-BR/index.js';

import { useCallback, useMemo } from 'react';
import {
  Container,
  Content,
  Body,
  Title,
  Button,
  Icon,
  CloseButton,
  Select,
  Month,
} from './styles';

type UpdateImageProps = {
  onRequestClose(): void;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const SelectMonth = ({
  onRequestClose,
  date,
  setDate,
}: UpdateImageProps): JSX.Element => {
  const dateFormatted = useMemo(() => {
    return format(date, 'MMMM, yyyy', {
      locale: ptBR,
    });
  }, [date]);

  const handlePreviousMonth = useCallback(() => {
    setDate(subMonths(date, 1));
  }, [setDate, date]);

  const handleNextMonth = useCallback(() => {
    setDate(addMonths(date, 1));
  }, [setDate, date]);

  return (
    <Container>
      <Content>
        <Body>
          <Title>Selecionar mês</Title>
          <Select>
            <Button onPress={handlePreviousMonth}>
              <Icon name="chevron-left" />
            </Button>
            <Month>{dateFormatted}</Month>
            <Button onPress={handleNextMonth}>
              <Icon name="chevron-right" />
            </Button>
          </Select>
        </Body>

        <CloseButton onPress={onRequestClose}>
          <Icon name="chevrons-down" />
        </CloseButton>
      </Content>
    </Container>
  );
};

export default SelectMonth;
