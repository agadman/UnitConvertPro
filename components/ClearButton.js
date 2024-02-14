import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ClearButton = ({ clearInput }) => {
  const handleClear = () => {
    clearInput();
  };

  return (
    <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
      <FontAwesome name="times" size={20} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    marginLeft: 10,
  },
});

export default ClearButton;
