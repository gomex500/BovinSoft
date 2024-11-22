import React, { useState } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import IConFontisto from 'react-native-vector-icons/Fontisto';
import { useTailwind } from 'tailwind-rn';
import moment from 'moment';


interface IDataPicker {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
}

const DatePickerExample = ({ date, setDate }: IDataPicker) => {
  const [show, setShow] = useState(false);
  const tw = useTailwind();

  const formatDate = (fecha: string | Date) => {
    return moment(fecha).format('DD MMMM').toUpperCase();
  }


  const onChange = (event: any, selectedDate: Date | null) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
  };

  return (
    <View style={tw('flex flex-col w-full')}>
      <TouchableOpacity style={styles.btn} onPress={() => setShow(true)}>
        <Text style={styles.btnText}>Seleccionar fecha</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <View style={tw('flex flex-row items-center justify-center w-full')}>
        <IConFontisto name="date" size={25} style={styles.icon} />
        <Text style={tw('text-lg')}>Fecha: {formatDate(date)}</Text>
      </View>
    </View>
  );
};

export default DatePickerExample;

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
