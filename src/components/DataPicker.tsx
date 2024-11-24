import React, { Children, useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import IConFontisto from 'react-native-vector-icons/Fontisto';
import { useTailwind } from 'tailwind-rn';
import moment from 'moment';
import { TextInput } from 'react-native-paper';
import { formatDate } from '../helpers/gen';


interface IDataPicker {
  date: Date | string;
  setDate: React.Dispatch<React.SetStateAction<Date | string>>;
  children: (setShow: (value: boolean) => void) => React.ReactNode;
}

const DatePickerInput = ({ date, setDate, children }: IDataPicker) => {
  const [show, setShow] = useState(false);
  const tw = useTailwind();

  const onChange = (event: any, selectedDate: Date | null) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={tw('flex flex-col w-full')}>
      {
        children(setShow)
      }
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date as Date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default DatePickerInput;

const styles = StyleSheet.create({
  icon: {
     position: 'absolute',
     left: 10,
     top: '50%',
     transform: [{ translateY: -12 }],
     zIndex: 1,
     color: '#1B4725'
  },
  btn:{
    backgroundColor:'#1B4725',
    width:"100%",
    height: 50,
    marginTop:40,
    borderRadius:10,
    borderTopLeftRadius:0,
    borderTopRightRadius:0,
    justifyContent: 'center'
},
btnText:{
  color: '#f2f2f2',
  textAlign:'center',
  fontSize:20
},
});
