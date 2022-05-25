import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useCallback,
  useMemo,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

import SelectMonth from '@modules/transactions/screens/SelectMonth';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

type CalendarContextData = {
  date: Date;
  dateFormatted: string;
  openSelectMonth(): void;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
};

const CalendarContext = createContext<CalendarContextData>(
  {} as CalendarContextData,
);

type CalendarProviderProps = {
  children: ReactNode;
};

const CalendarProvider = ({ children }: CalendarProviderProps): JSX.Element => {
  const INITIAL_VALUE = -1000;
  const FINAL_VALUE = 0;

  const [date, setDate] = useState(new Date());

  const selectMonthOffset = useSharedValue(INITIAL_VALUE);

  const selectMonthStyle = useAnimatedStyle(() => {
    return {
      bottom: selectMonthOffset.value,
    };
  });

  const dateFormatted = useMemo(() => {
    return format(date, 'MMMM/yyyy', { locale: ptBR });
  }, [date]);

  const openSelectMonth = useCallback(() => {
    selectMonthOffset.value = withTiming(FINAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [selectMonthOffset]);

  const closeSelectMonth = useCallback(() => {
    selectMonthOffset.value = withTiming(INITIAL_VALUE, {
      duration: 400,
      easing: Easing.ease,
    });
  }, [selectMonthOffset, INITIAL_VALUE]);

  return (
    <CalendarContext.Provider
      value={{ date, dateFormatted, openSelectMonth, setDate }}
    >
      {children}
      <Animated.View
        style={[
          selectMonthStyle,
          { width: '100%', height: '100%', position: 'absolute' },
        ]}
      >
        <SelectMonth
          onRequestClose={closeSelectMonth}
          date={date}
          setDate={setDate}
        />
      </Animated.View>
    </CalendarContext.Provider>
  );
};

function useCalendar(): CalendarContextData {
  const context = useContext(CalendarContext);

  if (!context) {
    throw new Error('useCalendar should be used within an CalendarProvider');
  }

  return context;
}

export { useCalendar, CalendarProvider };
