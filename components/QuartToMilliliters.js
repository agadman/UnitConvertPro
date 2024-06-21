import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import CustomIcon from './CustomIcon';

const QuartToMilliliters = () => {
  const [milliliters, setMilliliters] = useState('');
  const [quarts, setQuarts] = useState('');

  const handleMillilitersChange = (value) => {
    value = value.replace(/,/g, '.');

    setMilliliters(value);
    if (value === '') {
      setQuarts('');
      return;
    }

    const millilitersValue = parseFloat(value);
    if (isNaN(millilitersValue)) {
      setQuarts('');
      return;
    }

    const quartsValue = millilitersValue * 0.001057;
    setQuarts(quartsValue.toFixed(2));
  };

  const handleQuartsChange = (value) => {
    value = value.replace(/,/g, '.');

    setQuarts(value);
    if (value === '') {
      setMilliliters('');
      return;
    }

    const quartsValue = parseFloat(value);
    if (isNaN(quartsValue)) {
      setMilliliters('');
      return;
    }

    const millilitersValue = quartsValue / 0.001057;
    setMilliliters(millilitersValue.toFixed(2));
  };

  const clearInput = () => {
    setMilliliters('');
    setQuarts('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Quarts (qt)"
          value={quarts}
          onChangeText={handleQuartsChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {quarts !== '' && <Text style={styles.unit}>qt</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Milliliters (ml)"
          value={milliliters}
          onChangeText={handleMillilitersChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {milliliters !== '' && <Text style={styles.unit}>ml</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    position: 'relative',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'white',
    width: '40%',
  },
  input: {
    flex: 1,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 50, // Space for the unit
  },
  unit: {
    position: 'absolute',
    right: 10,
    top: '55%',
    transform: [{ translateY: -12 }], // Center vertically
    color: 'gray',
  },
});
export default QuartToMilliliters;