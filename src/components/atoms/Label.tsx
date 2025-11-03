import React from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';
import { colors } from '../../constants/colors';
import { typography } from '../../constants/typography';

export const Label: React.FC<TextProps> = ({ style, children, ...rest }) => (
  <Text {...rest} style={[typography.label, { color: colors.text }, style]}>
    {children}
  </Text>
);
