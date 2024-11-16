import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

interface IDataPicker {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DatePickerExample = ({ date, setDate }: IDataPicker) => {
  const [show, setShow] = useState(false);


  const onChange = (event: any, selectedDate: Date | null) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View>
      <Button onPress={() => setShow(true)} title="Seleccionar fecha" />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Text>Fecha seleccionada: {date.toDateString()}</Text>
    </View>
  );
};

export default DatePickerExample;
