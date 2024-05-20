import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const FeetToMeters = () => {
  const [meters, setMeters] = useState('');
  const [feet, setFeet] = useState('');

  const handleMetersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setMeters(value);
    if (value === '') {
      setFeet('');
      return;
    }
    const metersValue = parseFloat(value);
    const feetValue = metersValue * 3.28084;
    setFeet(feetValue.toFixed(2).toString() + ' ft');
  };
  
  const handleFeetChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setFeet(value);
    if (value === '') {
      setMeters('');
      return;
    }
    const feetValue = parseFloat(value);
    const metersValue = feetValue / 3.28084;
    setMeters(metersValue.toFixed(2).toString() + ' m');
  };  

  const clearInput = () => {
    setMeters('');
    setFeet('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Feet (ft)"
        value={feet}
        onChangeText={handleFeetChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon size={20} color="white" />
      <TextInput
        style={styles.input}
        placeholder="Meters (m)"
        value={meters}
        onChangeText={handleMetersChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    margin: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '40%',
  },
});
export default FeetToMeters;