import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DatePickerExample = (props) => {
  const [show, setShow] = useState(false);

  const { date, setDate } = props;

  const onChange = (event, selectedDate) => {
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
