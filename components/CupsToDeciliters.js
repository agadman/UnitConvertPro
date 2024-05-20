import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import CustomIcon from './CustomIcon';

const CupsToDeciliters = () => {
  const [deciliters, setDeciliters] = useState('');
  const [cups, setCups] = useState('');

  const handleDecilitersChange = (value) => {
    value = value.replace(/,/g, '.');

    setDeciliters(value);
    if (value === '') {
      setCups('');
      return;
    }
    const decilitersValue = parseFloat(value);
    const cupsValue = decilitersValue * 0.422675; // 1 dl is approximately 0.422675 cups
    setCups(cupsValue.toFixed(2).toString() + ' cups');
  };

  const handleCupsChange = (value) => {
    value = value.replace(/,/g, '.');

    setCups(value);
    if (value === '') {
      setDeciliters('');
      return;
    }
    const cupsValue = parseFloat(value);
    const decilitersValue = cupsValue / 0.422675; // 1 cup is approximately 2.366 deciliters
    setDeciliters(decilitersValue.toFixed(2).toString() + ' dl');
  };

  const clearInput = () => {
    setDeciliters('');
    setCups('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cups"
        value={cups}
        onChangeText={handleCupsChange}
        onFocus={clearInput}
        keyboardType="numeric"
      />
      <CustomIcon />
      <TextInput
        style={styles.input}
        placeholder="Deciliters (dl)"
        value={deciliters}
        onChangeText={handleDecilitersChange}
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

export default CupsToDeciliters;
