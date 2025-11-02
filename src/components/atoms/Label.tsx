import React from 'react';
import { Text, TextProps } from 'react-native';
import { colors } from '../../design/colors';
import { typography } from '../../design/typography';

export const Label: React.FC<TextProps> = ({ style, children, ...rest }) => (
  <Text {...rest} style={[typography.label, { color: colors.text }, style]}>
    {children}
  </Text>
);
