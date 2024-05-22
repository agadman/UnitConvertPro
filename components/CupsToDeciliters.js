import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const CupsToDeciliters = () => {
  const [deciliters, setDeciliters] = useState('');
  const [cups, setCups] = useState('');

  const handleDecilitersChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setDeciliters(value);

      if (value === '') {
        setCups('');
        return;
      }

      const decilitersValue = parseFloat(value);
      if (isNaN(decilitersValue)) {
        setCups('');
        return;
      }

      const cupsValue = decilitersValue * 0.422675; 
      setCups(cupsValue.toFixed(2) + ' cups');
    } catch (error) {
      console.error('Error converting deciliters to cups:', error);
      setDeciliters('');
      setCups('');
    }
  };

  const handleCupsChange = (value) => {
    try {
      value = value.replace(/,/g, '.');

      setCups(value);

      if (value === '') {
        setDeciliters('');
        return;
      }

      const cupsValue = parseFloat(value);
      if (isNaN(cupsValue)) {
        setDeciliters('');
        return;
      }

      const decilitersValue = cupsValue / 0.422675; 
      setDeciliters(decilitersValue.toFixed(2) + ' dl');
    } catch (error) {
      console.error('Error converting cups to deciliters:', error);
      setDeciliters('');
      setCups('');
    }
  };

  const clearInput = (setInput) => {
    setInput('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cups"
        value={cups}
        onChangeText={handleCupsChange}
        onFocus={() => clearInput(setCups)}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Deciliters (dl)"
        value={deciliters}
        onChangeText={handleDecilitersChange}
        onFocus={() => clearInput(setDeciliters)}
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
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 8,
    marginRight: 8,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    width: '40%',
  },
});

export default CupsToDeciliters;