import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ClearButton from './ClearButton';

const PoundsToKgConverter = () => {
  const [kilograms, setKilograms] = useState('');
  const [pounds, setPounds] = useState('');

  const handleKilogramsChange = (value) => {
    setKilograms(value);
    if (value === '') {
      setPounds('');
      return;
    }
    const kilogramsValue = parseFloat(value);
    const poundsValue = kilogramsValue * 2.20462;
    setPounds(poundsValue.toFixed(2).toString() + ' lbs');
  };

  const handlePoundsChange = (value) => {
    setPounds(value);
    if (value === '') {
      setKilograms('');
      return;
    }
    const poundsValue = parseFloat(value);
    const kilogramsValue = poundsValue / 2.20462;
    setKilograms(kilogramsValue.toFixed(2).toString() + ' kg');
  };

  const clearInput = () => {
    setPounds('');
    setKilograms('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Pounds(lbs)"
            value={pounds}
            onChangeText={handlePoundsChange}
            onFocus={() => clearInput(setPounds)}
            keyboardType="numeric"
          />
          <FontAwesome name="exchange" size={20} color="white" />
          <TextInput
            style={styles.input}
            placeholder="Kilograms(kg)"
            value={kilograms}
            onChangeText={handleKilogramsChange}
            onFocus={() => clearInput(setKilograms)}
            keyboardType="numeric"
          />
          <ClearButton clearInput={clearInput} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    padding: 10,
    backgroundColor: 'white',
    width: '30%',
  },
});

export default PoundsToKgConverter;
