import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const QuartToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [quarts, setQuarts] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setMilliliters(value);
    if (value === '') {
      setQuarts('');
      return;
    }
    const millilitersValue = parseFloat(value);
    const quartsValue = millilitersValue * 0.001057;
    setQuarts(quartsValue.toFixed(2).toString() + ' qt');
  };
  
  const handleQuartsChange = (value) => {
    value = value.replace(/,/g, '.').replace(/\./g, '.');
  
    setQuarts(value);
    if (value === '') {
      setMilliliters('');
      return;
    }
    const quartsValue = parseFloat(value);
    const millilitersValue = quartsValue / 0.001057;
    setMilliliters(millilitersValue.toFixed(2).toString() + ' ml');
  };
  
  const clearInput = () => {
    setMilliliters('');
    setQuarts('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Quarts (qt)"
        value={quarts}
        onChangeText={handleQuartsChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon size={20} color="white" />
      <TextInput
        style={styles.input}
        placeholder="Milliliters (ml)"
        value={milliliters}
        onChangeText={handleMillilitersChange}
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
export default QuartToMilliliters;