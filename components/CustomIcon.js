import React from 'react';
import { Image } from 'react-native';

const CustomIcon = ({ size = 24, color = 'white' }) => {
  return <Image source={require('../assets/sort-by.png')} style={{ width: size, height: size, tintColor: color }} />;
};

export default CustomIcon;
