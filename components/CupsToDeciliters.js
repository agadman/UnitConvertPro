import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
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
    if (isNaN(decilitersValue)) {
      setCups('');
      return;
    }

    const cupsValue = decilitersValue * 0.422675;
    setCups(cupsValue.toFixed(2));
  };

  const handleCupsChange = (value) => {
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
    setDeciliters(decilitersValue.toFixed(2));
  };

  const clearInput = () => {
    setCups('');
    setDeciliters('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Cups (c)"
          value={cups}
          onChangeText={handleCupsChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {cups !== '' && <Text style={styles.unit}>cups</Text>}
      </View>
      <CustomIcon />
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          placeholder="Deciliters (dl)"
          value={deciliters}
          onChangeText={handleDecilitersChange}
          onFocus={clearInput}
          keyboardType="numeric"
        />
        {deciliters !== '' && <Text style={styles.unit}>dl</Text>}
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
export default CupsToDeciliters;