import React, { useState } from 'react';
import { View, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ClearButton from './ClearButton';

const OuncesToKgConverter = () => {
  const [kilograms, setKilograms] = useState('');
  const [ounces, setOunces] = useState('');

  const handleKilogramsChange = (value) => {
    setKilograms(value);
    if (value === '') {
      setOunces('');
      return;
    }
    const kilogramsValue = parseFloat(value);
    const ouncesValue = kilogramsValue * 35.274;
    setOunces(ouncesValue.toFixed(2).toString() + ' oz');
  };

  const handleOuncesChange = (value) => {
    setOunces(value);
    if (value === '') {
      setKilograms('');
      return;
    }
    const ouncesValue = parseFloat(value);
    const kilogramsValue = ouncesValue / 35.274;
    setKilograms(kilogramsValue.toFixed(2).toString() + ' kg');
  };

  const clearInput = () => {
    setOunces('');
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
            placeholder="Ounces(oz)"
            value={ounces}
            onChangeText={handleOuncesChange}
            onFocus={() => clearInput(setOunces)}
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

export default OuncesToKgConverter;
