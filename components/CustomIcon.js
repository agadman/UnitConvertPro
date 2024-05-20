import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

const CustomIcon = ({ size = 20, color = 'white' }) => {
  return <FontAwesomeIcon icon={faExchangeAlt} size={size} color={color} />;
};

export default CustomIcon;
